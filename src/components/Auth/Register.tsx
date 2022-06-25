import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/Input';
import { styles } from './styles';
import { RegisterValues } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authActions } from '../../store';
import { RootState } from '../../store/reducers';

const Register = () => {

    const initialValues: RegisterValues = {
        email: '',
        realtorName: '',
        profileImg: '',
        password: '',
        confirmPassword: ''
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { feedback } = useAppSelector((state: RootState) => state.user);
    const [values, setValues] = useState(initialValues);
    const [checkPassword, setCheckPassword] = useState(false);

    useEffect(() => {
        if (feedback === 'success') {
            navigate('/')
        }
    }, [feedback]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const reader = new FileReader();

        reader.onload = function () {
            const imgUrl = reader.result;
            setValues({ ...values, profileImg: imgUrl });
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (values.password === values.confirmPassword) {
            setCheckPassword(false);
            dispatch(authActions.register(values));
        } else {
            setCheckPassword(true);
        }
    }

    const { formWrapper, link, text, form } = styles;

    return (
        <div className={formWrapper}>
            <form className={form} onSubmit={handleSubmit}>
                <h1 className={text}>Register</h1>

                <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    handleChange={handleChange}
                />

                <TextInput
                    label="Realtor Names"
                    name="realtorName"
                    type="text"
                    placeholder=""
                    handleChange={handleChange}
                />

                <input
                    name="profileImg"
                    type="file"
                    onChange={handleImageInput}
                    required
                />

                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    handleChange={handleChange}
                />

                <TextInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    handleChange={handleChange}
                />

                {checkPassword && (
                    <p className='text-red-500'>Passwords do not match!</p>
                )}

                {feedback === 'errors' && (
                    <p className='text-red-500'>
                        An error occurred!
                        <br />
                        Check email doesn't exist!
                    </p>
                )}

                <Button buttonText='Register' type="submit" />

                <h1 className={text}>Already have an account? <Link className={link} to="/login">Login</Link></h1>
            </form>
        </div>
    );
};

export default Register;
