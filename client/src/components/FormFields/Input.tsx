import React from "react";
import { Field, FormikErrors, FormikTouched } from "formik";
import { FormValues } from "../RealtorAdmin/UploadProperty";

export default function Input({
  name,
  errors,
  touched,
  type,
  placeholder
}: {
  name: string;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col my-3">
      <Field className="rounded-md" id={name} name={name} type={type} placeholder={placeholder} />
      {errors[name as keyof FormValues] &&
        touched[name as keyof FormValues] && (
          <ErrorMessage
            message={
              typeof errors[name as keyof FormValues] === "string"
                ? errors[name as keyof FormValues]
                : ""
            }
          />
        )}
    </div>
  );
}

export const ErrorMessage = ({ message }: { message: any }) => {
  return <span className="text-red-500 text-sm">{message}</span>;
}
