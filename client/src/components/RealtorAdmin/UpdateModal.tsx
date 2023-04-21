import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getPropertyById } from "../../api/properties";
import PropertyForm from "./PropertyForm";

const defaultValues = {
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

export default function UpdateModal({
  show,
  setShowUpdateModal,
  propertyId,
  setPropertyIdToUpdate,
}: {
  show: boolean;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  propertyId: string | null;
  setPropertyIdToUpdate: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [initValues, setInitialValues] = useState<InitValuesProps | null>(null);

  const { data: propertyData } = useQuery({
    queryKey: ["realtor_properties", propertyId],
    enabled: propertyId !== null,
    queryFn: () => getPropertyById(propertyId!),
  });

  useEffect(() => {
    if (propertyData) {
      const initialValues: InitValuesProps = {
        formikValues: {
          location: propertyData.location,
          title: propertyData.title,
          address: propertyData.address,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          property_type: propertyData.property_type,
          category: propertyData.category,
          price: propertyData.price,
          size: propertyData.size,
        },
        description: propertyData.description,
        property_id: propertyData.id,
        property_images: propertyData.property_images,
      };
      setInitialValues(initialValues);
    }
  }, [propertyData]);

  return (
    <Modal
      show={show}
      onClose={() => {
        setShowUpdateModal(false);
        setPropertyIdToUpdate(null);
      }}
      size="4xl"
      className=""
    >
      <div className="h-screen">
        <Modal.Header>Update property</Modal.Header>
        <Modal.Body className="overflow-y-auto h-3/4 py-4">
          {initValues !== null && (
            <PropertyForm form_type={"update"} initialValues={initValues} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="gray"
            onClick={() => {
              setShowUpdateModal(false);
              setPropertyIdToUpdate(null);
              setInitialValues(null);
            }}
          >
            Exit
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
