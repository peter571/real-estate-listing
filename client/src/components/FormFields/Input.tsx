import React from "react";
import { Field, FormikErrors, FormikTouched } from "formik";

export default function Input({
  name,
  errors,
  touched,
  type,
  placeholder,
}: {
  name: string;
  errors: FormikErrors<PropertyFormValues>;
  touched: FormikTouched<PropertyFormValues>;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col my-3">
      <Field
        className="rounded-md"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {errors[name as keyof PropertyFormValues] &&
        touched[name as keyof PropertyFormValues] && (
          <ErrorMessage
            message={
              typeof errors[name as keyof PropertyFormValues] === "string"
                ? errors[name as keyof PropertyFormValues]
                : ""
            }
          />
        )}
    </div>
  );
}

export const ErrorMessage = ({ message }: { message: any }) => {
  return <span className="text-red-500 text-sm">{message}</span>;
};
