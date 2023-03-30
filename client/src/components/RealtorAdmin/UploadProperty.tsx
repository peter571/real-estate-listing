import { MutableRefObject, useRef, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import Input from "../FormFields/Input";
import { Button } from "flowbite-react";
import SelectInput from "../FormFields/SelectInput";
import { filterData } from "../../utils";

//Get Property types and categories list
const typeList = filterData[0].items;
const categoriesList = filterData[filterData.length - 1].items;

export interface FormValues {
  location: string;
  address: string;
  bedrooms: number | undefined;
  bathrooms: number | undefined;
  type: string;
  category: string;
  images: File[];
  price: number | undefined;
  size: number | undefined;
  companyMail: string;
  websiteUrl: string;
}

const initialValues: FormValues = {
  location: "",
  address: "",
  bedrooms: undefined,
  bathrooms: undefined,
  type: "",
  category: "",
  images: [],
  price: undefined,
  size: undefined,
  companyMail: "",
  websiteUrl: "",
};

export default function UploadProperty() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // handle form submission
    console.log({
      ...values,
      images: imagePreviews,
      description: descriptionRef.current?.value,
    });

    setSubmitting(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const previews = [...imagePreviews];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          previews.push(reader.result as string);
          setImagePreviews([...previews]);
        };
      }
    }
  };

  const handleImageRemove = (index: number) => {
    const previews = [...imagePreviews];
    previews.splice(index, 1);
    setImagePreviews([...previews]);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="sm:w-full lg:w-2/3 p-3">
          <h1 className="text-xl font-extrabold my-10">Upload your property</h1>
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

          <SelectInput
            labelName={"Type"}
            name={"type"}
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

          <div className="flex flex-col">
            <label htmlFor="images">Upload property Images</label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <div className="flex flex-row gap-2 flex-wrap">
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <div className="my-1" key={index}>
                    <img src={preview} alt={`preview-${index}`} width="100" />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                    >
                      Remove
                    </button>
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

          <Input
            placeholder={"Company Email"}
            name={"companyMail"}
            errors={errors}
            touched={touched}
            type={"email"}
          />
          <Input
            placeholder={"Website URL"}
            name={"websiteUrl"}
            errors={errors}
            touched={touched}
            type={"url"}
          />

          <Button
            className="full-btn my-3"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
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
  type: Yup.string().required("Type is required"),
  category: Yup.string().required("Category is required"),
  images: Yup.array()
    .of(
      Yup.mixed().test("fileSize", "File size is too large", (value: any) =>
        value ? value.size <= 5242880 : true
      )
    )
    .required("Images are required"),
  price: Yup.number()
    .required("Price is required")
    .min(1)
    .required("Minimum Value is 1"),
  size: Yup.number()
    .required("Size is required")
    .min(1)
    .required("Minimum Value is 1"),
  companyMail: Yup.string()
    .email("Invalid email")
    .required("Company email is required"),
  websiteUrl: Yup.string()
    .url("Invalid URL")
    .required("Website URL is required"),
});
