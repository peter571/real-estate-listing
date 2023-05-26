import React, { useState } from "react";
import { Button, Pagination, Table } from "flowbite-react";
import PropertyRow from "./PropertyRow";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import {
  getRealtorPausedProperties,
  getRealtorProperties,
} from "../../api/realtors";
import SpinnerLoader from "../Loaders/Spinner";
import { usePagination } from "../../hooks/usePagination";
import { FaLongArrowAltRight } from "react-icons/fa";
import PropertyRowLoader from "../Loaders/PropertyRowLoader";

export default function PausedProperties() {
  const { realtorUser, currentUser } = useAuth();
  const { currentPage, onPageChange } = usePagination();

  const { data: realtorProperties, isLoading } = useQuery({
    enabled: realtorUser !== null,
    queryKey: ["paused_properties", currentPage],
    queryFn: () =>
      getRealtorPausedProperties(
        realtorUser!.id,
        currentUser.accessToken,
        currentPage
      ),
  });

  return (
    <div className="p-5">
      <b className="">Paused Properties</b>

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
          {isLoading &&
            <PropertyRowLoader />}
          {!isLoading && realtorProperties["properties"].length === 0 && (
            <Table.Row className="ml-5 my-10">
              <Table.Cell className="font-bold">No properties yet!</Table.Cell>
            </Table.Row>
          )}
          {!isLoading &&
            realtorProperties &&
            realtorProperties["properties"]
              .filter((item: PropertyDetailsCard) => !item.active)
              .map((property: PropertyDetailsCard) => (
                <PropertyRow key={property.id} {...property} />
              ))}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-center text-center py-10">
        {!isLoading && realtorProperties["pages"] > 1 && (
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
