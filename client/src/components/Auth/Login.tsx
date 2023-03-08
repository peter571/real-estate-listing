import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Alert } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface FormValues {
  email: string;
  password: string;
}

export default function Login({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { login, checkIfUserExists, currentUser } = useAuth();
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setErrMsg('')
    const res = await checkIfUserExists(values.email);
    if (res.length > 0) {
      await login(values.email, values.password).catch();
    } else if (res.length === 0) {
      setErrMsg("This user does not exists! Create Account");
    }
    setSubmitting(false);
  };

  console.log(currentUser)

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-4 w-full sm:w-[285px]">
          {errMsg && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <span className="font-medium">SignIn Error!</span> {errMsg}
              </span>
            </Alert>
          )}
          <div className="w-full">
            <Button className="w-full bg-[#f3f3f3]">
              <FcGoogle className="mr-2" size={22} />
              <span>Login with Google</span>
            </Button>
          </div>
          <h1 className="text-center">OR</h1>
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

          <Button type="submit" disabled={isSubmitting}>
            Log In
          </Button>
          <p
            onClick={() => navigate("/password-reset")}
            className="text-center text-blue-500 cursor-pointer hover:underline"
          >
            Reset password
          </p>
          <p className="text-center">
            No account?{" "}
            <span
              onClick={() => setShowLogin(false)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </Form>
      )}
    </Formik>
  );
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
