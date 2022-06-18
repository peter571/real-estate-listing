import React from 'react';
import { useField } from 'formik';
import { styles } from './styles';

type Type = 'text' | 'number' | 'password' | 'file' | 'email';

interface TextInputProps {
    label: string;
    type: Type;
    placeholder?: string;
    name: string;
    id?: any;
    handleChange?: (e: React.ChangeEvent<any>) => void;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
    
    const [field, meta] = useField(props);

    const { labelStyle, textInput, errorText, inputWrapper } = styles;
    return (
        <div className={inputWrapper}>
            <label className={labelStyle} htmlFor={props.id || props.name}>{label}</label>
            <input className={textInput} {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={errorText}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextInput;
