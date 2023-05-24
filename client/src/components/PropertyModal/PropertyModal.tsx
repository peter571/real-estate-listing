import React from "react";
import { Carousel, Modal } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { getPropertyById } from "../../api/properties";
import { FaBed, FaBath } from "react-icons/fa";
import default_image from "../../assets/images/default_image.png";

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

  if (propertyData.property_id === null) return <></>;

  return (
    <React.Fragment>
      <Modal
        show={propertyData.show}
        dismissible={true}
        size="7xl"
        onClose={() =>
          setShowPropertyModalData({ show: false, property_id: null })
        }
        className=""
      >
        <Modal.Header>
          {property?.category.replace("_", " ").charAt(0).toUpperCase() +
            property?.category.replace("_", " ").slice(1)}
        </Modal.Header>
        <Modal.Body className="grid grid-cols-2">
          <div className="flex flex-col">
            <div className="h-96">
              {property?.property_images.length === 0 ? (
               <img src={default_image} alt="default image" className="object-cover h-96 w-full" />
              ) : (
                <Carousel slideInterval={5000}>
                  {property?.property_images &&
                    property?.property_images.map((image: any, idx: number) => (
                      <img key={idx} src={image} alt={property?.description} />
                    ))}
                </Carousel>
              )}
            </div>
            <div className="py-3 font-bold flex flex-wrap gap-6 items-center">
              <span className="p-2 gap-2 rounded-md bg-[#f3f3f3]">
                KSH {property?.price.toLocaleString()}
              </span>
              <span className="p-2 gap-2 rounded-md bg-[#f3f3f3]">
                {property?.address}
              </span>
              <span className="p-2 gap-2 rounded-md bg-[#f3f3f3]">
                {property?.property_type
                  .replace("_", " ")
                  .charAt(0)
                  .toUpperCase() +
                  property?.property_type.replace("_", " ").slice(1)}
              </span>
              <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
                <FaBed color="#1E3240" />
                <span className="text-sm font-semibold">
                  {property?.bedrooms}
                </span>
              </span>
              <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
                <FaBath color="#1E3240" />
                <span className="text-sm font-semibold">
                  {property?.bathrooms}
                </span>
              </span>
            </div>
          </div>
          <div className="px-5 py-2 overflow-y-auto h-96">
            <p>{property?.description}</p>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
