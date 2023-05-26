import { Table } from "flowbite-react";
import React from "react";

export default function PropertyRowLoader() {
  return (
    <Table.Row className="bg-white animate-pulse">
      <Table.Cell className="inline-flex items-center align-middle">
        <div className="h-8 w-12 object-cover bg-gray-200 mr-2 rounded-md" />
        <p className="w-56 bg-gray-200 h-3 rounded-md"></p>
      </Table.Cell>
      <Table.Cell>
        <p className="bg-gray-200 h-3 w-1/2 rounded-md"></p>
      </Table.Cell>
      <Table.Cell>
        <p className="bg-gray-200 h-3 w-1/2 rounded-md"></p>
      </Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  );
}
