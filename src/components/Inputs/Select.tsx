import React from 'react';
import { useField } from 'formik';
import { styles } from './styles';

interface SelectProp {
    label: string;
    name: string;
    type: string;
    id?: any;
    children: React.ReactNode;
}

const Select = ({ label, ...props }: SelectProp) => {
    const [field, meta] = useField(props);

    const { labelStyle, textInput, errorText, inputWrapper } = styles;
    return (
      <div className={inputWrapper}>
        <label className={labelStyle} htmlFor={props.id || props.name}>{label}</label>
        <select className={textInput} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={errorText}>{meta.error}</div>
        ) : null}
      </div>
    );
  }; 

export default Select;
