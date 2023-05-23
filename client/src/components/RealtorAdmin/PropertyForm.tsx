import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../FormFields/Input";
import { Button, Spinner } from "flowbite-react";
import SelectInput from "../FormFields/SelectInput";
import { filterData } from "../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProperty, updateProperty } from "../../api/properties";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { uploadImages } from "../../api/utils";

//Get Property types and categories list
const typeList = filterData[0].items;
const categoriesList = filterData[filterData.length - 1].items;

export default function PropertyForm({
  form_type,
  initialValues,
}: {
  form_type: FormType;
  initialValues: InitValuesProps;
}) {
  const [imagePreviews, setImagePreviews] = useState<(string | File)[]>([]);
  const [selectedImages, setSelectedImages] = useState<(string | File)[]>([]);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const { realtorUser, currentUser } = useAuth();
  const queryClient = useQueryClient();

  const createPropertyMutation = useMutation({
    mutationFn: createNewProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["realtor_properties"] });
      queryClient.invalidateQueries({
        queryKey: ["active_properties"],
      });
      toast.success("Property added!");
    },
    onError: () => {
      toast.error("An error occured!");
    },
  });

  const updatePropertyMutation = useMutation({
    mutationFn: updateProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["realtor_properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["active_properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["paused_properties"],
      });
      toast.success("Property updated!");
    },
    onError: () => {
      toast.error("Failed to update property!");
    },
  });

  const handleSubmit = async (
    values: PropertyFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: any }
  ) => {
    // handle form submission
    if (form_type === "create") {
      createPropertyMutation
        .mutateAsync({
          realtor_id: realtorUser!.id,
          propertyDetails: {
            location: values.location,
            description: descriptionRef.current?.value,
            address: values.address,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
            property_type: values.property_type,
            category: values.category,
            property_images: imagePreviews,
            price: values.price,
            size: values.size,
          },
          userToken: currentUser!.accessToken,
        })
        .then(() => {
          resetForm({ values: "" });
          descriptionRef.current!.value = "";
          setImagePreviews([]);
          setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else if (form_type === "update") {
      setSubmitting(true);
      updatePropertyMutation
        .mutateAsync({
          realtor_id: realtorUser!.id,
          property_id: initialValues!.property_id,
          propertyDetails: {
            location: values.location,
            description: descriptionRef.current?.value,
            address: values.address,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
            property_type: values.property_type,
            category: values.category,
            property_images: imagePreviews,
            price: values.price,
            size: values.size,
          },
          userToken: currentUser!.accessToken,
        })
        .then(() => {
          setSubmitting(false);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setSelectedImages([...selectedImages, ...files]);
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          imagePreviews.push(reader.result as string);
          setImagePreviews([...imagePreviews]);
        };
      }
    }
  };

  const handleUploadImages = async () => {
    const formData = new FormData();

    selectedImages.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    return await uploadImages(currentUser.accessToken, formData).then(
      (res) => res
    );
  };

  const handleImageRemove = (index: number) => {
    const previews = [...imagePreviews];
    previews.splice(index, 1);
    setImagePreviews([...previews]);

    const selected = [...selectedImages];
    selected.splice(index, 1);
    setSelectedImages([...selected]);
  };

  useEffect(() => {
    descriptionRef.current!.value = initialValues.description;
    setImagePreviews(initialValues.property_images);
  }, []);

  return (
    <Formik
      initialValues={initialValues.formikValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="sm:w-full lg:w-2/3 p-3">
          {form_type === "create" && (
            <h1 className="text-xl font-extrabold my-10">
              Upload your property
            </h1>
          )}

          <Input
            placeholder={"Location"}
            name={"location"}
            errors={errors}
            touched={touched}
            type={"text"}
          />
          <textarea
            className="rounded-sm my-4 w-full"
            ref={descriptionRef}
            name="description"
            id="description"
            placeholder="Add property description..."
            rows={4}
            maxLength={2500}
          ></textarea>
          <Input
            placeholder={"Address"}
            name={"address"}
            errors={errors}
            touched={touched}
            type={"text"}
          />
          <Input
            placeholder={"Bedrooms"}
            name={"bedrooms"}
            errors={errors}
            touched={touched}
            type={"number"}
          />
          <Input
            placeholder={"Bathrooms"}
            name={"bathrooms"}
            errors={errors}
            touched={touched}
            type={"number"}
          />

          <Input
            placeholder={"Size of property"}
            name={"size"}
            errors={errors}
            touched={touched}
            type={"number"}
          />

          <SelectInput
            labelName={"Property Type"}
            name={"property_type"}
            optionsList={typeList}
            errors={errors}
            touched={touched}
          />
          <SelectInput
            labelName={"Category"}
            name={"category"}
            optionsList={categoriesList}
            errors={errors}
            touched={touched}
          />

          <div className=" my-5">
            <label
              className="cursor-pointer border p-2 rounded-md bg-gray-800 text-white"
              htmlFor="property_images"
            >
              Upload property Images
            </label>
            <input
              className="hidden"
              id="property_images"
              name="property_images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className="flex flex-row gap-2 flex-wrap my-3">
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div className="my-1" key={index}>
                    <img
                      src={preview.toString()}
                      alt={`preview-${index}`}
                      className="w-32 h-24"
                    />
                    <span
                      className="font-medium hover:text-blue-600 hover:underline text-sm"
                      role="button"
                      onClick={() => handleImageRemove(index)}
                    >
                      Remove
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <Input
            placeholder={"Price (KSH)"}
            name={"price"}
            errors={errors}
            touched={touched}
            type={"number"}
          />

          <Button
            className="full-btn my-3"
            type="submit"
            disabled={createPropertyMutation.isLoading}
          >
            {createPropertyMutation.isLoading ? (
              <Spinner aria-label="loading" />
            ) : (
              "Submit"
            )}
          </Button>
          {/* <Button type="button" onClick={() => handleUploadImages()}>
            Images
          </Button> */}
        </Form>
      )}
    </Formik>
  );
}

const validationSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  address: Yup.string().required("Address is required"),
  bedrooms: Yup.number()
    .required("Bedrooms is required")
    .min(1)
    .required("Minimum Value is 1"),
  bathrooms: Yup.number()
    .required("Bathrooms is required")
    .min(1)
    .required("Minimum Value is 1"),
  size: Yup.number().min(1).required("Minimum Value is 1"),
  property_type: Yup.string().required("Type is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1)
    .required("Minimum Value is 1"),
});
