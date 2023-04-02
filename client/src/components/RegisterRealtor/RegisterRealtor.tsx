import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface FormValues {
  companyName: string;
  description: string;
  profileImg: string;
}

export default function RegisterRealtor() {
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: any }
  ) => {
    console.log({ ...values, profileImg: profilePic });
    resetForm();
    setProfilePic("");
    setSubmitting(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setProfilePic(reader.result as string);
      };
    }
  };

  return (
    <React.Fragment>
      <Button className="ring-btn" onClick={() => setShow(true)}>
        Register as Realtor
      </Button>
      <Modal dismissible={true} show={show} onClose={() => setShow(false)}>
        <Modal.Header>Submit Details</Modal.Header>
        <Modal.Body className="flex justify-center items-center">
          <Formik
            initialValues={{ companyName: "", description: "", profileImg: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-4 w-full sm:w-[285px]">
                <div className="flex flex-col">
                  <Field
                    className="rounded-md"
                    type="text"
                    placeholder="Coompany Name..."
                    name="companyName"
                  />
                  {touched.companyName && errors.companyName ? (
                    <span className="text-red-500">{errors.companyName}</span>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <Field
                    className="rounded-md"
                    type="text"
                    placeholder="Description..."
                    name="description"
                  />
                  {touched.description && errors.description ? (
                    <span className="text-red-500">{errors.description}</span>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label
                    className="border p-2 rounded-md font-semibold hover:text-blue-500"
                    role="button"
                    htmlFor="images"
                  >
                    Upload picture
                  </label>
                  <input
                    className="hidden"
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {profilePic && (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="h-14 w-14 object-cover py-2"
                    />
                  )}
                </div>
                <Button
                  className="full-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required."),
  description: Yup.string().required("Description is required."),
});
