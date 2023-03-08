import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  repeatPassword: string;
  password: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    // Handle form submission here, such as sending a request to the server
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center align-items-center">
      <Formik
        initialValues={{ password: "", repeatPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-4 w-full sm:w-[285px]">
            <div className="flex flex-col">
              <Field
                className="rounded-md"
                type="password"
                placeholder="Password"
                name="password"
              />
              {touched.password && errors.password ? (
                <span className="text-red-500">{errors.password}</span>
              ) : null}
            </div>
            <div className="flex flex-col">
              <Field
                className="rounded-md"
                type="password"
                name="repeatPassword"
                placeholder="Password"
              />
              {touched.repeatPassword && errors.repeatPassword ? (
                <span className="text-red-500">{errors.repeatPassword}</span>
              ) : null}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Reset Password
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
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Repeat password is required"),
});
