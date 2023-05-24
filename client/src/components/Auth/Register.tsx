import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Alert } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { HiInformationCircle } from "react-icons/hi";

interface FormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

export default function Register({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { signup, checkIfUserExists, currentUser, googleSignUp } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setErrMsg("");
    const res = await checkIfUserExists(values.email);
    if (res.length === 0) {
      await signup(values.email, values.password).then(() => navigate("/"));
    } else if (res.length > 0) {
      setErrMsg("This email is already registered.");
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", repeatPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="flex flex-col gap-4 w-full sm:w-[285px]">
          {errMsg && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <span className="font-medium">SignUp Error!</span> {errMsg}
              </span>
            </Alert>
          )}
          <div className="w-full">
            <Button
              onClick={async () =>
                await googleSignUp().then(() => navigate("/"))
              }
              className="w-full ring-btn"
            >
              <FcGoogle className="mr-2 ring-btn" size={22} />
              <span>Sign Up with Google</span>
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
          <Button className="full-btn" type="submit" disabled={isSubmitting}>
            Register
          </Button>
          <p
            onClick={() => navigate("/password-reset")}
            className="text-center text-blue-500 cursor-pointer hover:underline"
          >
            Reset password
          </p>
          <p className="text-center">
            Already have an account?{" "}
            <span
              onClick={() => setShowLogin(true)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Log in
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
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Repeat password is required"),
});
