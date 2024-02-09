import PropertyForm from "components/RealtorAdmin/PropertyForm";

const initialValues: InitValuesProps = {
  formikValues: {
    location: "",
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
