import React from 'react';
import { useField } from 'formik';
import { styles } from './styles';

interface TextAreaProp {
    label: string;
    name: string;
    id?: any;
    rows: number;
    placeholder: string;
    type: string;
}

const TextArea = ({label, ...props}: TextAreaProp) => {
    
    const [field, meta] = useField(props);

    const { inputWrapper, textInput, errorText } = styles;
    return (
        <div className={inputWrapper}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className={textInput} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={errorText}>{meta.error}</div>
            ) : null}
        </div>
    );
  };

export default TextArea;
