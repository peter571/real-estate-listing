import React, { useState } from "react";
import { Button, Tooltip } from "flowbite-react";
import { FaBed, FaBath, FaHeart, FaRuler } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToFavorites, checkPropertyIsFavorite } from "../../api/favorite";
import { useAuth } from "../../contexts/AuthContext";
import PropertyModal from "../PropertyModal/PropertyModal";
import EmailAgentModal from "../EmailAgentModal/EmailAgentModal";
import default_image from "../../assets/images/default_image.png";
import { numberFormatter } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function PropertyCard(props: PropertyDetailsCard) {
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPropertyModalData, setShowPropertyModalData] =
    useState<PropertyModalProp>({ show: false, property_id: null });
  const [showEmailAgentModal, setShowEmailAgentModal] = useState<{
    show: boolean;
    realtor_id: string | null;
  }>({
    show: false,
    realtor_id: null,
  });

  const { data: isFavorite } = useQuery({
    enabled: currentUser !== null,
    queryKey: ["isFavorite", props.id],
    queryFn: () =>
      checkPropertyIsFavorite(
        currentUser.uid,
        props.id,
        currentUser.accessToken
      ),
  });

  const addToFavoriteMutation = useMutation({
    mutationFn: () =>
      addToFavorites(
        currentUser?.uid,
        props.id,
        isFavorite === "True" ? "remove" : "add",
        currentUser.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFavorite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  function favorite() {
    if (isFavorite === "False" || isFavorite === undefined) {
      return "gray";
    } else {
      return "red";
    }
  }

  return (
    <div className="w-full md:max-w-sm cursor-pointer relative bg-gray-50 drop-shadow-lg rounded-lg">
      <img
        className="h-56 w-full object-cover rounded-md"
        alt="Property Image"
        src={
          props.property_images.length === 0
            ? default_image
            : props.property_images[0]
        }
        role="button"
        onClick={() =>
          setShowPropertyModalData({ show: true, property_id: props.id })
        }
      />

      <div className="flex justify-between items-center py-2">
        <h5 className="xl:text-xl font-semibold tracking-tight text-gray-900 mx-3">
          KSH {numberFormatter.format(Number(props.price))}
        </h5>

        <Button
          className="m-2 email-btn"
          onClick={() =>
            setShowEmailAgentModal({ show: true, realtor_id: props.owner_id })
          }
        >
          Email Agent
        </Button>
      </div>

      <p className="font-normal text-gray-700 mx-3">{props.address}</p>
      
      <p className="flex justify-between mx-3 my-2">
        <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
          <FaBed color="#1E3240" />
          <span className="text-sm font-semibold">{props.bedrooms}</span>
        </span>
        <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
          <FaBath color="#1E3240" />
          <span className="text-sm font-semibold">{props.bathrooms}</span>
        </span>
        <span className="flex flex-row justify-center items-center p-2 gap-2 rounded-md bg-[#f3f3f3]">
          <FaRuler color="#1E3240" />
          <span className="text-sm font-semibold">{props.size}</span>
        </span>
      </p>

      <span
        role="button"
        className="absolute top-4 right-4 rounded-md bg-white p-1"
        onClick={() => {
          if (isLoggedIn) {
            addToFavoriteMutation.mutate();
          } else {
            navigate("/auth");
          }
        }}
      >
        <Tooltip
          content={
            isFavorite === "True"
              ? "Remove from favorites."
              : "Add to favorites."
          }
        >
          <FaHeart color={favorite()} />
        </Tooltip>
      </span>

      <span className="absolute top-4 left-4 rounded-md text-sm font-semibold bg-[#F85A47] p-1 text-white">
        {props?.property_type.replace("_", " ").charAt(0).toUpperCase() +
          props?.property_type.replace("_", " ").slice(1)}
      </span>

      <PropertyModal
        propertyData={showPropertyModalData}
        setShowPropertyModalData={setShowPropertyModalData}
      />
      <EmailAgentModal
        data={showEmailAgentModal}
        setShowEmailAgentModal={setShowEmailAgentModal}
      />
    </div>
  );
}
