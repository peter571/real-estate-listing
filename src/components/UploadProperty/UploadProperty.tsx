import React from 'react';
import { Form, Formik } from 'formik';
import { styles } from '../Auth/styles';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/TextInput';
import * as Yup from 'yup';
import Select from '../Inputs/Select';
import TextArea from '../Inputs/TextArea';
import { PropertyValues } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers';
import { propertyActions } from '../../store';

const UploadProperty = () => {
    const initialValues = {
        contact: '',
        owner: '',
        rooms: 0,
        bathrooms: 0,
        price: 0,
        sqft: 0,
        place: '',
        type: '',
        description: '',
        title: ''
    };

    const dispatch = useAppDispatch();
    const { images } = useAppSelector((state: RootState) => state.properties);

    const { formWrapper, form, link, text } = styles;
    return (
        <div className={`${formWrapper} my-5 min-h-screen`}>
            <Formik
                initialValues={initialValues}
                
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        dispatch(propertyActions.create({ images: images, ...values }))
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className={`${form} w-[45%]`}>
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
                        <option value="rent">Rent</option>
                        <option value="buy">Buy</option>
                    </Select>

                    <Button buttonText='Save & Submit' type="submit" />

                </Form>
            </Formik>

        </div>
    )
}

export default UploadProperty;