import React from "react";
import { Table } from "flowbite-react";
import PropertyRow from "./PropertyRow";

export default function RealtorProperties() {
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
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
          <PropertyRow />
        </Table.Body>
      </Table>
    </div>
  );
}
