import React from "react";
import { Table } from "flowbite-react";
import PropertyRow from "./PropertyRow";
import { useQuery } from "@tanstack/react-query";
import { getRealtorProperties } from "../../api/realtors";
import { useAuth } from "../../contexts/AuthContext";

export default function RealtorProperties() {
  const { realtorUser } = useAuth();

  const { data: realtorProperties } = useQuery({
    enabled: realtorUser !== null,
    queryKey: ["realtor_properties", realtorUser!.id],
    queryFn: () => getRealtorProperties(realtorUser!.id),
  });

  return (
    <div className="p-5">
      <b className="">Live Properties</b>

      <Table className="mt-5" striped={true}>
        <Table.Head>
          <Table.HeadCell>Property name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span role="button" className="sr-only">
              Pause/Activate
            </span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span role="button" className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span role="button" className="sr-only">
              Delete
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {realtorProperties &&
            realtorProperties
              .filter((item: PropertyDetailsCard) => item.active)
              .map((property: PropertyDetailsCard) => (
                <PropertyRow key={property.id} {...property} />
              ))}
        </Table.Body>
      </Table>
    </div>
  );
}
