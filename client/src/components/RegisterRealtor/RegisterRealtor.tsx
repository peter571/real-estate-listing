import React, { useState } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerRealtorAccount } from "../../api/realtors";

export default function RegisterRealtor() {
  const [show, setShow] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createRealtorMutation = useMutation({
    mutationFn: registerRealtorAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["realtor-account"],
      });
      setProfilePic("");
      setShow(false);
      navigate("/realtor-admin");
    },
  });

  const handleSubmit = async (
    values: RealtorFormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: any }
  ) => {
    //Register account
    createRealtorMutation
      .mutateAsync({
        userToken: currentUser.accessToken,
        realtorDetails: {
          user_id: currentUser.uid,
          company_name: values.company_name,
          description: values.description,
          profile_picture: profilePic,
          company_mail: values.company_mail,
          website_url: values.website_url,
          contact: values.contact,
        },
      })
      .then(() => {
        resetForm();
      }).catch((err) => {
        console.log(err)
      });
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
        <Modal.Header>Submit Details for Realtor account</Modal.Header>
        <Modal.Body className="flex justify-center items-center">
          <Formik
            initialValues={{
              company_name: "",
              description: "",
              profile_picture: "",
              website_url: "",
              company_mail: "",
              contact: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              <Form className="flex flex-col gap-4 w-full sm:w-[285px]">
                <div className="flex flex-col">
                  <Field
                    className="rounded-md"
                    type="text"
                    placeholder="Company Name..."
                    name="company_name"
                  />
                  {touched.company_name && errors.company_name ? (
                    <span className="text-red-500">{errors.company_name}</span>
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
                  <Field
                    className="rounded-md"
                    type="text"
                    placeholder="Company mail..."
                    name="company_mail"
                  />
                  {touched.company_mail && errors.company_mail ? (
                    <span className="text-red-500">{errors.company_mail}</span>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <Field
                    className="rounded-md"
                    type="text"
                    placeholder="Website url..."
                    name="website_url"
                  />
                  {touched.website_url && errors.website_url ? (
                    <span className="text-red-500">{errors.website_url}</span>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <Field
                    className="rounded-md"
                    type="text"
                    placeholder="Contact..."
                    name="contact"
                  />
                  {touched.contact && errors.contact ? (
                    <span className="text-red-500">{errors.contact}</span>
                  ) : null}
                </div>
                <div className="flex flex-col">
                  <label
                    className="border p-2 rounded-md font-semibold hover:text-blue-500"
                    role="button"
                    htmlFor="image"
                  >
                    Upload picture
                  </label>
                  <input
                    id="image"
                    className="hidden"
                    name="image"
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
                  disabled={createRealtorMutation.isLoading}
                >
                  {createRealtorMutation.isLoading ? (
                    <Spinner aria-label="loading" />
                  ) : (
                    "Register"
                  )}
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
  company_name: Yup.string().required("Company name is required."),
  description: Yup.string().required("Description is required."),
});
