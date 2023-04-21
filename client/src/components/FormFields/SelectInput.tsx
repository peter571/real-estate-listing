import React from "react";
import { Field, FormikErrors, FormikTouched } from "formik";
import { ErrorMessage } from "./Input";

export default function SelectInput({
  labelName,
  name,
  optionsList,
  errors,
  touched,
}: {
  labelName: string;
  name: string;
  optionsList: any[];
  errors: FormikErrors<PropertyFormValues>;
  touched: FormikTouched<PropertyFormValues>;
}) {
  return (
    <div className="flex flex-col my-3">
      <Field className="rounded-md" id={name} name={name} as="select">
        <option value="">{labelName}</option>
        {optionsList &&
          optionsList.map((lst, idx) => (
            <option key={idx} value={lst.value}>
              {lst.name}
            </option>
          ))}
      </Field>
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
