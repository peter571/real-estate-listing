import React, { useState } from "react";
import { Table } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteProperty,
  updatePropertyAvailability,
} from "../../api/properties";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";

export default function PropertyRow(props: PropertyDetailsCard) {
  const { realtorUser } = useAuth();
  const queryClient = useQueryClient();
  const [show, setShowDeleteModal] = useState(false);

  const propertyStatusMutation = useMutation({
    mutationFn: () =>
      updatePropertyAvailability(
        realtorUser!.id,
        props.id,
        props.active ? "deactivate" : "activate"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["realtor_properties", props.owner_id],
      });
      toast.success("Property status updated!");
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: () => deleteProperty(realtorUser!.id, props.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["realtor_properties", props.owner_id],
      });
      toast.success("Property deleted!");
    },
  });

  return (
    <Table.Row className="bg-white">
      <Table.Cell className="inline-flex align-middle gap-2 whitespace-nowrap font-medium text-gray-900">
        <img
          className="h-8 w-12 object-cover"
          src={props.property_images[0]}
          alt="image"
        />
        <p className="w-56 truncate">{props.title}</p>
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
        >
          Edit
        </span>
      </Table.Cell>
      <DeleteModal
        show={show}
        setShowDeleteModal={setShowDeleteModal}
        deleteItem={deletePropertyMutation}
      />
    </Table.Row>
  );
}
