import { useField } from 'formik';
import React from 'react';
import { styles } from './styles';

interface CheckboxProp {
    children: React.ReactNode;
    name: string;
}

const Checkbox = ({ children, ...props }: CheckboxProp) => {
    
    const [field, meta] = useField({ ...props, type: 'checkbox' });

    const { errorText, inputWrapper } = styles;
    return (
      <div className={inputWrapper}>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className={errorText}>{meta.error}</div>
        ) : null}
      </div>
    );
  };
  
  export default Checkbox;
 