import { Form, Formik } from 'formik';
import { styles } from '../Auth/styles';
import { Button } from '../CustomComponents';
import TextInput from '../Inputs/Input';
import * as Yup from 'yup';
import Select from '../Inputs/Select';
import Checkbox from '../Inputs/Checkbox';
import TextArea from '../Inputs/TextArea';

interface PropertyValues {
    images: string;
    verified: boolean;
    rooms: number;
    bathrooms: number;
    price: number;
    sqft: number;
    description: string;
    place: string;
    type: string;
    availability: boolean;
}

const UploadProperty = () => {
    const initialValues: PropertyValues = {
        images: '',
        rooms: 0,
        bathrooms: 0,
        price: 0,
        sqft: 0,
        place: '',
        type: '',
        description: '',
        verified: false,
        availability: false
    };

    const { formWrapper, form, link, text } = styles;
    return (
        <div className={`${formWrapper} my-2`}>
            <Formik
                initialValues={initialValues}
                
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form className={`${form} w-[45%]`}>
                    <h1 className={text}>Upload Your Property</h1>

                    <TextInput
                        label="Property Images"
                        name="images"
                        type="text"
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

                    <Checkbox name="verified">
                        Verified
                    </Checkbox>

                    <Checkbox name="availability">
                        Availability
                    </Checkbox>

                    <Button buttonText='Submit' type="submit" />

                </Form>
            </Formik>

        </div>
    )
}

export default UploadProperty;