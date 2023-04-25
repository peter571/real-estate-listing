import React from "react";
import { Carousel, Modal } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "../../api/properties";

export default function PropertyModal({
  propertyData,
  setShowPropertyModalData,
}: {
  propertyData: PropertyModalProp;
  setShowPropertyModalData: React.Dispatch<
    React.SetStateAction<PropertyModalProp>
  >;
}) {
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", propertyData.property_id],
    enabled: propertyData.property_id !== null,
    queryFn: () => getPropertyById(propertyData.property_id!),
  });

  console.log(property);

  return (
    <React.Fragment>
      <Modal
        show={propertyData.show}
        dismissible={true}
        size="6xl"
        onClose={() =>
          setShowPropertyModalData({ show: false, property_id: null })
        }
        className="h-screen"
      >
        <div className="h-3/4">
          <Modal.Header>Property title</Modal.Header>
          <Modal.Body className="grid grid-cols-2 h-full">
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel slideInterval={5000}>
                {property.property_images &&
                  property?.property_images.map((image: any, idx: number) => (
                    <img key={idx} src={image} alt={property.title} />
                  ))}
              </Carousel>
            </div>
            <div>
              <p>{property?.description}</p>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </React.Fragment>
  );
}
