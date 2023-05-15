import React, { useState } from "react";
import { Table } from "flowbite-react";
import PropertyRow from "./PropertyRow";
import { useQuery } from "@tanstack/react-query";
import { getRealtorActiveProperties } from "../../api/realtors";
import { useAuth } from "../../contexts/AuthContext";
import { Pagination } from "flowbite-react";
import SpinnerLoader from "../Loader/Spinner";
import { usePagination } from "../../hooks/usePagination";

export default function RealtorProperties() {
  const { realtorUser, currentUser } = useAuth();
  const {currentPage, onPageChange } = usePagination();

  const { data: realtorProperties, isLoading } = useQuery({
    enabled: realtorUser !== null,
    queryKey: ["active_properties", currentPage],
    queryFn: () => getRealtorActiveProperties(realtorUser!.id, currentUser.accessToken, currentPage),
  });

  if (isLoading) return <SpinnerLoader />;

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
            realtorProperties["properties"]
              .filter((item: PropertyDetailsCard) => item.active)
              .map((property: PropertyDetailsCard) => (
                <PropertyRow key={property.id} {...property} />
              ))}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-center text-center py-10">
        {realtorProperties["pages"] > 1 && (
          <Pagination
            currentPage={currentPage}
            layout="pagination"
            onPageChange={onPageChange}
            showIcons={true}
            totalPages={realtorProperties["pages"]}
            previousLabel="Go back"
            nextLabel="Go forward"
          />
        )}
      </div>
    </div>
  );
}
