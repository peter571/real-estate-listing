import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/TextInput';
import { styles } from './styles';
import { LoginValues } from '../../types'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authActions } from '../../store';
import { RootState } from '../../store/reducers';

const Login = () => {

    const initialValues: LoginValues = {
        email: '',
        password: '',
    };

    const dispatch = useAppDispatch();
    const { feedback } = useAppSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (feedback === 'success') {
            navigate('/')
        }
    }, [feedback]);

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
                    
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
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

                    {feedback === 'errors' && (
                        <h1 className='text-red-500'>
                            An error occurred!
                            <br /> Check credentials and try again!
                        </h1>
                    )}
                    
                    <Button buttonText='Login' type="submit" />
                    <h1 className={text}>Don't have an account? <Link className={link} to="/register">Register</Link></h1>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
