import React from 'react';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/Input';
import { styles } from './styles';

interface RegisterValues {
    email: string;
    password: string;
    profileImage: string;
    confirmPassword: string;
}

const Register = () => {

    const initialValues: RegisterValues = {
        email: '',
        profileImage: '',
        password: '',
        confirmPassword: ''
    };

    const [imgSrc, setImgSrc] = useState('');

    const { formWrapper, link, text, form } = styles;

    return (
        <div className={formWrapper}>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .required('No password provided.')
                        .min(8, 'Password is too short - should be 8 chars minimum.')
                        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')

                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values);
                        setSubmitting(false);
                    }, 400);
                }}

            
            >
                {({
                    values,
                    errors,
                    touched,
                    //handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form className={form}>
                        <h1 className={text}>Register</h1>

                        <TextInput
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                        />

                        <TextInput
                            label="Upload Profile Image"
                            name="profileImage"
                            type="file"
                            
                        />

                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                        />

                        <TextInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                        />

                        <Button buttonText='Register' type="submit" />

                        <h1 className={text}>Already have an account? <Link className={link} to="/login">Login</Link></h1>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
