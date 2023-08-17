import React, { useState } from "react";
import { Button, Table } from "flowbite-react";
import PropertyRow from "./PropertyRow";
import { useQuery } from "@tanstack/react-query";
import { getRealtorActiveProperties } from "../../api/realtors";
import { useAuth } from "../../contexts/AuthContext";
import { Pagination } from "flowbite-react";
import SpinnerLoader from "../Loaders/Spinner";
import { usePagination } from "../../hooks/usePagination";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRealtorAdminContext } from "./RealtorAdminContext";
import PropertyRowLoader from "../Loaders/PropertyRowLoader";

export default function RealtorProperties() {
  const { realtorUser, currentUser } = useAuth();
  const { currentPage, onPageChange } = usePagination();
  const { handleTabClick } = useRealtorAdminContext();

  const { data: realtorProperties, isLoading } = useQuery({
    enabled: realtorUser !== null,
    queryKey: ["active_properties", currentPage],
    queryFn: () =>
      getRealtorActiveProperties(
        realtorUser!.id,
        currentUser.accessToken,
        currentPage
      ),
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
          {isLoading && <PropertyRowLoader />}
          {!isLoading &&
            realtorProperties["properties"] &&
            realtorProperties["properties"].length === 0 && (
              <Table.Row className="my-10 ml-5">
                <Table.Cell className="">
                  <h1 className="font-bold">No properties yet!</h1>
                  <Button
                    color="gray"
                    className="flex items-center my-5"
                    type="button"
                    onClick={() => handleTabClick("uploadproperty")}
                  >
                    <span className="mr-2">Upload properties</span>
                    <FaLongArrowAltRight />
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
          {!isLoading &&
            realtorProperties["properties"] &&
            realtorProperties["properties"]
              .filter((item: PropertyDetailsCard) => item.active)
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
