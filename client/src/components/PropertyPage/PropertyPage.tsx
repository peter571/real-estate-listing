import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getPropertyById } from "../../api/properties";
import { Button, Carousel } from "flowbite-react";
import default_image from "../../assets/images/default_image.png";
import { FaBath, FaBed, FaRuler } from "react-icons/fa";
import { useParams } from "react-router-dom";
import EmailAgentModal from "../EmailAgentModal/EmailAgentModal";
import PropertyPageLoader from "../Loaders/PropertyPageLoader";

export default function PropertyPage() {
  const [showEmailAgentModal, setShowEmailAgentModal] = useState<{
    show: boolean;
    realtor_id: string | null;
  }>({
    show: false,
    realtor_id: null,
  });
  const { id } = useParams();
  const { data: property, isLoading } = useQuery({
    queryKey: ["property", id],
    enabled: id !== null,
    queryFn: () => getPropertyById(id!),
  });

  if (isLoading) return <PropertyPageLoader />;

  return (
    <div className="fixed top-20 w-2/3 overflow-y-auto h-screen no-scrollbar">
      {/*Property images*/}
      <div className="flex flex-col">
        <div className="h-96">
          {property?.property_images.length === 0 ? (
            <img
              src={default_image}
              alt="default image"
              className="object-cover h-96 w-full"
            />
          ) : (
            <Carousel slideInterval={5000}>
              {property?.property_images &&
                property?.property_images.map((image: any, idx: number) => (
                  <img key={idx} src={image} alt={property?.description} />
                ))}
            </Carousel>
          )}
        </div>
        {/*Details of the property.*/}
        <div className="py-3 font-bold gap-6">
          <span className="flex flex-row items-center p-2 gap-2 rounded-md">
            <span className="h-5 w-5 bg-reddish rounded-md"></span>
            {property?.property_type.replace("_", " ").charAt(0).toUpperCase() +
              property?.property_type.replace("_", " ").slice(1)}
          </span>

          <span className="p-2 gap-2 rounded-md block">
            KSH {property?.price.toLocaleString()}
          </span>

          <span className="p-2 gap-2 rounded-md block">
            {property?.address}
          </span>

          <div className="w-2/3 flex justify-between items-center p-2">
            <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
              Bed
              <FaBed color="#1E3240" />
              <span className="text-sm font-semibold">
                {property?.bedrooms}
              </span>
            </span>
            <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
              Bath
              <FaBath color="#1E3240" />
              <span className="text-sm font-semibold">
                {property?.bathrooms}
              </span>
            </span>
            <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
              Sqft
              <FaRuler color="#1E3240" />
              <span className="text-sm font-semibold">{property?.size}</span>
            </span>
          </div>
          <Button
            className="m-2 email-btn"
            onClick={() =>
              setShowEmailAgentModal({
                show: true,
                realtor_id: property.owner_id,
              })
            }
          >
            Email Agent
          </Button>
        </div>
      </div>
      <div className="py-5 overflow-y-auto no-scrollbar h-96">
        <p>{property?.description}</p>
      </div>

      <EmailAgentModal
        data={showEmailAgentModal}
        setShowEmailAgentModal={setShowEmailAgentModal}
      />
    </div>
  );
}
