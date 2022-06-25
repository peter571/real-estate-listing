import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { styles } from '../Auth/styles';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/TextInput';
import * as Yup from 'yup';
import Select from '../Inputs/Select';
import TextArea from '../Inputs/TextArea';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers';
import { propertyActions } from '../../store';
import { TiTick } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Apartment', value: '4' },
    { name: 'Townhouses', value: '16' },
    { name: 'Villas', value: '3' },
    { name: 'Penthouses', value: '18' },
    { name: 'Hotel Apartments', value: '21' },
    { name: 'Villa Compound', value: '19' },
    { name: 'Residential Plot', value: '14' },
    { name: 'Residential Floor', value: '12' },
    { name: 'Residential Building', value: '17' },
];

const UploadProperty = () => {
    const initialValues = {
        contact: '',
        rooms: 0,
        bathrooms: 0,
        price: 0,
        sqft: 0,
        place: '',
        type: '',
        description: '',
        title: '',
        category: '',
        availability: true,
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { images, feedback } = useAppSelector((state: RootState) => state.properties);
    const { user: { _id } } = JSON.parse(localStorage.getItem('realtor')!);

    useEffect(() => {
        if (feedback === "success") {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [feedback])

    const { formWrapper, form, link, text } = styles;

    return (
        <div className={`${formWrapper} my-5 min-h-screen`}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                       
                        if (images?.length === 0) return alert('Images not loaded!')
                        dispatch(propertyActions.create({
                            images: images,
                            owner: _id,
                            ...values
                        }));
                        setSubmitting(false);
                        resetForm({ values: initialValues });
                    }, 400);
                }}

            >
                <Form className={`${form}`}>
                    <h1 className={text}>Upload Your Property Details</h1>

                    <TextInput
                        label="Title of Property"
                        name="title"
                        type="text"
                        placeholder='e.g Villas'
                    />

                    <TextInput
                        label="Number of rooms"
                        name="rooms"
                        type="number"
                    />

                    <TextInput
                        label="Number of Bathrooms"
                        name="bathrooms"
                        type="number"
                    />

                    <TextInput
                        label="Price ($)"
                        name="price"
                        type="number"
                    />

                    <TextInput
                        label="Square Foot Area"
                        name="sqft"
                        type="number"
                    />

                    <TextInput
                        label="Location/Place"
                        name="place"
                        type="text"
                        placeholder="e.g Nairobi, WestLands"
                    />

                    <TextArea
                        label="Property Description"
                        name="description"
                        type="text"
                        rows={6}
                        placeholder="Some description about your property."
                    />

                    <Select
                        label="Type Rent/Buy"
                        name="type"
                        type="select"
                    >
                        <option value="">Select a property type</option>
                        <option value="for-rent">Rent</option>
                        <option value="for-sale">Buy</option>
                    </Select>

                    <Select
                        label="Property Category"
                        name="category"
                        type="select"
                    >
                        <option value="">Select property Category</option>
                        {categories.map((item) => <option key={item.value} value={item.value}>{item.name}</option>)}
                    </Select>

                    <TextInput
                        label="Realtor contact information"
                        name="contact"
                        type="number"
                    />

                    {feedback === "success" && (
                        <p className='text-green-500 flex items-center'>
                            Property Submitted
                            <TiTick />
                        </p>
                    )}

                    {feedback === "errors" && (
                        <p className='text-red-500 flex items-center'>
                            An error occured!
                            <TiTick />
                        </p>
                    )}

                    {images?.length === 0 && (
                        <p className='text-red-500'>Images not loaded! {" "}
                            <Link className='text-sky-500' to='/upload-property/images'>Upload Images</Link>
                        </p>
                    )}

                    <Button buttonText='Save & Submit' type="submit" />

                </Form>
            </Formik>
        </div>
    )
}

export default UploadProperty;