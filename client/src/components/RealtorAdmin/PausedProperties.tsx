import React from "react";
import { Pagination, Table } from "flowbite-react";
import PropertyRow from "components/RealtorAdmin/PropertyRow";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "context/AuthContext";
import {
  getRealtorPausedProperties,
} from "api/realtors";
import { usePagination } from "hooks/usePagination";
import PropertyRowLoader from "components/Loaders/PropertyRowLoader";

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
