import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Alert, Button } from "flowbite-react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

interface FormValue {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [status, setStatus] = useState("");

  const handleSubmit = async (
    values: FormValue,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    //
    await resetPassword(values.email)
      .then((res) => {
        setStatus("submitted");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-4 w-full sm:w-[285px] mt-10">
            {status === "submitted" && (
              <Alert
                color="success"
                onDismiss={function onDismiss() {
                  setStatus("");
                }}
              >
                <span>
                  <span className="font-medium">Success!</span>{" "} 
                  Check your email for instructions.
                </span>
              </Alert>
            )}

            <h1 className="font-bold text-center">Enter email</h1>
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
