import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "flowbite-react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface FormValue {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (
    values: FormValue,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // Handle form submission here, such as sending a request to the server
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center align-items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-4 w-full sm:w-[285px] mt-10">
            <div className="flex flex-col">
              <Field
                className="rounded-md"
                type="email"
                placeholder="Email"
                name="email"
              />
              {touched.email && errors.email ? (
                <span className="text-red-500">{errors.email}</span>
              ) : null}
            </div>

            <Button className="full-btn" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <p
              onClick={() => navigate("/auth")}
              className="text-center text-blue-500 cursor-pointer hover:underline"
            >
              Back to login{" "}
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
