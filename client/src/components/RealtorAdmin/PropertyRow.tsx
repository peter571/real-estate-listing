import React, { useState } from "react";
import { Table } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProperty,
  updatePropertyAvailability,
} from "api/properties";
import { useAuth } from "context/AuthContext";
import { toast } from "react-toastify";
import DeleteModal from "components/RealtorAdmin/DeleteModal";
import UpdateModal from "components/RealtorAdmin/UpdateModal";
import default_image from "assets/images/default_image.png";
import { deleteFileFromStorage } from "firebaseapp/util_functions";
import { getImageNameFromUrl } from "@/utils";

export default function PropertyRow(props: PropertyDetailsCard) {
  const { realtorUser, currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [propertyId, setPropertyIdToUpdate] = useState<string | null>(null);

  const propertyStatusMutation = useMutation({
    mutationFn: () =>
      updatePropertyAvailability(
        realtorUser!.id,
        props.id,
        props.active ? "deactivate" : "activate",
        currentUser.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["active_properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["paused_properties"],
      });
      toast.success("Property status updated!");
    },
  });

  const handleDeleteImagesFromStorage = async () => {
    if (props.property_images.length > 0) {
      await Promise.all(
        props.property_images.map(async (file_url) => {
          try {
            await deleteFileFromStorage(getImageNameFromUrl(file_url));
          } catch (error) {}
        })
      );
    }
  };

  const deletePropertyMutation = useMutation({
    mutationFn: () =>
      deleteProperty(realtorUser!.id, props.id, currentUser.accessToken),
    onSuccess: async () => {
      //Delete images from storage
      await handleDeleteImagesFromStorage()

      //Invalidate queries
      queryClient.invalidateQueries({
        queryKey: ["realtor_properties", props.owner_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["active_properties"],
      });
      queryClient.invalidateQueries({
        queryKey: ["paused_properties"],
      });
      toast.success("Property deleted!");
    },
  });

  return (
    <Table.Row className="bg-white">
      <Table.Cell className="inline-flex align-middle gap-2 whitespace-nowrap font-medium text-gray-900">
        <img
          className="h-8 w-12 object-cover"
          src={
            props.property_images.length === 0
              ? default_image
              : props.property_images[0]
          }
          alt="image"
        />
        <p className="w-56 truncate">{props.category}</p>
      </Table.Cell>
      <Table.Cell>{props.category}</Table.Cell>
      <Table.Cell>{props.price}</Table.Cell>
      <Table.Cell>
        <span
          role="button"
          className="font-medium text-blue-600 hover:underline"
          onClick={() => propertyStatusMutation.mutate()}
        >
          {props.active ? "Hide" : "Activate"}
        </span>
      </Table.Cell>
      <Table.Cell>
        <span
          role="button"
          className="font-medium text-blue-600 hover:underline"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </span>
      </Table.Cell>
      <Table.Cell>
        <span
          role="button"
          className="font-medium text-blue-600 hover:underline"
          onClick={() => {
            setShowUpdateModal(true);
            setPropertyIdToUpdate(props.id);
          }}
        >
          Edit
        </span>
      </Table.Cell>
      <DeleteModal
        show={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteItem={deletePropertyMutation}
      />
      <UpdateModal
        show={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        propertyId={propertyId}
        setPropertyIdToUpdate={setPropertyIdToUpdate}
      />
    </Table.Row>
  );
}
