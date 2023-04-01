import React from "react";
import { Table } from "flowbite-react";
import image from "../../assets/images/estate.jpg";

export default function PropertyRow() {
  const paused: boolean = true;

  return (
    <Table.Row className="bg-white">
      <Table.Cell className="inline-flex align-middle gap-2 whitespace-nowrap font-medium text-gray-900">
        <img className="h-8 w-12 object-cover" src={image} alt="image" />
        <p className="w-56 truncate">
          As you mark tasks as complete, you’ll move up through the levels. Your
          current level will always be shown here.
        </p>
      </Table.Cell>
      <Table.Cell>Town houses</Table.Cell>
      <Table.Cell>123,000</Table.Cell>
      <Table.Cell>
        {paused ? (
          <span
            role="button"
            className="font-medium text-blue-600 hover:underline"
          >
            Activate
          </span>
        ) : (
          <span
            role="button"
            className="font-medium text-blue-600 hover:underline"
          >
            Pause
          </span>
        )}
      </Table.Cell>
      <Table.Cell>
        <span
          role="button"
          className="font-medium text-blue-600 hover:underline"
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
    </Table.Row>
  );
}
