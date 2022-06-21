import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/TextInput';
import { styles } from './styles';
import { LoginValues } from '../../types'
import { useAppDispatch } from '../../store/hooks';
import { authActions } from '../../store';

const Login = () => {

    const initialValues: LoginValues = {
        email: '',
        password: '',
    };

    const dispatch = useAppDispatch();

    const { formWrapper, form, text, link } = styles;
    return (
        <div className={formWrapper}>
            
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .required('No password provided.'),
                        // .min(8, 'Password is too short - should be 8 chars minimum.')
                        // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values)
                        dispatch(authActions.login(values));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className={form}>

                <h1 className={text}>Login</h1>

                    <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="example@gmail.com"
                    />

                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                    />

                    <Button buttonText='Login' type="submit" />
                    <h1 className={text}>Don't have an account? <Link className={link} to="/register">Register</Link></h1>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
