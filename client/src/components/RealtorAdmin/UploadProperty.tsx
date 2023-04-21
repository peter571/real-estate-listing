import PropertyForm from "./PropertyForm";

const initialValues: InitValuesProps = {
  formikValues: {
    location: "",
    title: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "",
    category: "",
    price: "",
    size: "",
  },
  description: "",
  property_id: "",
  property_images: [],
};

export default function UploadProperty() {
  return <PropertyForm form_type={"create"} initialValues={initialValues} />;
}
