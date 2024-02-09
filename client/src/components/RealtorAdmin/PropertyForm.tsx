import { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "components/FormFields/Input";
import { Button, Spinner } from "flowbite-react";
import SelectInput from "components/FormFields/SelectInput";
import { filterData, getImageNameFromUrl } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProperty, updateProperty } from "api/properties";
import { useAuth } from "context/AuthContext";
import { toast } from "react-toastify";
import { deleteFileFromStorage, uploadFileToStorage } from "firebaseapp/util_functions";
import { v4 as uuidv4 } from "uuid";

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
  const [imagePreviews, setImagePreviews] = useState<(FileType | string)[]>([]);
  const [selectedImages, setSelectedImages] = useState<FileType[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);

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
    const images = await handleUploadImages();

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
            property_images: images,
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
            property_images: images,
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

  const handleFileChange = (e: React.ChangeEvent<any>) => {
    const files = e.target.files;

    const filePreviews: (string | FileType)[] = [...imagePreviews];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();

      reader.onload = (event) => {
        const preview = event.target?.result;
        if (typeof preview === "string") {
          filePreviews.push({
            file_url: preview,
            name: file.name,
            type: file.type,
          });
          setImagePreviews([...filePreviews]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImages = async () => {
    /**Upload files to file storage and get back the urls */
    setUploadingFiles(true);
    const fileUrls = await Promise.all(
      imagePreviews.map(async (file: any) => {
        try {
          if (typeof file === "object") {
            const url = await uploadFileToStorage(
              file.file_url,
              uuidv4() + file.name
            );
            return url;
          }
          return file;
        } catch (error) {
          // Handle the error if needed
          console.error(error);
          //return file; // Return the file without modifying the URL
        }
      })
    );
    setUploadingFiles(false);

    return fileUrls;
  };

  //Delete a selected image
  const handleImageRemove = async (index: number) => {
    const previews = [...imagePreviews];
    previews.splice(index, 1);
    setImagePreviews([...previews]);

    const selected = [...selectedImages];
    selected.splice(index, 1);
    setSelectedImages([...selected]);

    let item = previews[index]

    if (typeof item === "string") {
      const res = await deleteFileFromStorage(getImageNameFromUrl(item))
      console.log(res)
    }
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
              onChange={handleFileChange}
            />
            <div className="flex flex-row gap-2 flex-wrap my-3">
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div className="my-1" key={index}>
                    <img
                      src={
                        typeof preview === "object" ? preview.file_url : preview
                      }
                      alt={`preview-${
                        typeof preview === "object"
                          ? preview.name
                          : getImageNameFromUrl(preview)
                      }`}
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
            disabled={
              createPropertyMutation.isLoading ||
              updatePropertyMutation.isLoading ||
              uploadingFiles
            }
          >
            {createPropertyMutation.isLoading ||
            createPropertyMutation.isLoading ? (
              <Spinner aria-label="loading" />
            ) : (
              "Submit"
            )}
          </Button>
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
