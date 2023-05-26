import { Card } from "flowbite-react";
import React from "react";

export default function RealtorCardLoader() {
  return (
    <div className="max-w-sm">
      <Card>
        <div className="flex flex-col items-center pb-10 animate-pulse">
          <div className="bg-gray-200 h-24 w-24 rounded-full" />
          <h5 className="w-2/3 h-4 bg-gray-200 my-1 rounded-md"></h5>
          <span className="w-2/3 h-4 bg-gray-200 my-1 rounded-md"></span>

          <div className="mt-4 flex space-x-3 lg:mt-6 w-full">
            <span
              role="button"
              className="rounded-lg w-1/2 h-4 bg-gray-200  py-2 px-4 "
            ></span>
            <span
              role="button"
              className="gap-1 rounded-lg border-gray-300 w-1/2 h-4 bg-gray-200 py-2 px-4"
            ></span>
          </div>
        </div>
      </Card>
    </div>
  );
}
