import React from 'react';
import { styles } from './styles';

type Type = 'text' | 'number' | 'password' | 'file' | 'email';

interface TextInputProps {
    label: string;
    type: Type;
    placeholder?: string;
    name: string;
    id?: any;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | ((file: File) => void);
    errorMsg?: string;
}

const TextInput = ({ label, errorMsg, handleChange, ...props }: TextInputProps) => {
    
    const { labelStyle, textInput, errorText, inputWrapper } = styles;
    return (
        <div className={inputWrapper}>
            <label className={labelStyle} htmlFor={props.id || props.name}>{label}</label>
            <input className={textInput} {...props} onChange={handleChange} required/>
            {errorMsg ? (
                <div className={errorText}>{errorMsg}</div>
            ) : null}
        </div>
    );
};

export default TextInput;
