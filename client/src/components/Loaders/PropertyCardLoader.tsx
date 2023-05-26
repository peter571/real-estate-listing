import React from "react";

export default function PropertyCardLoader() {
  return (
    <div className="animate-pulse w-full md:max-w-sm relative bg-gray-50 drop-shadow-lg rounded-lg pb-2">
      <div className="h-56 w-full bg-gray-200 rounded-md" />

      <div className="flex justify-between items-center py-2 rounded-md mt-2">
        <h5 className="mx-3 bg-gray-200 h-3 rounded-md w-1/3"></h5>

        <button className="m-2 bg-gray-200 h-8 rounded-md w-1/3"></button>
      </div>

      <p className="font-normal mx-3 bg-gray-200 h-3 rounded-md w-1/3"></p>

      <p className="flex justify-between mx-3 my-2">
        <span className="p-2 w-12 gap-2 rounded-md bg-gray-200"></span>
        <span className="p-2 w-12 gap-2 rounded-md bg-gray-200"></span>
        <span className="p-2 w-12 gap-2 rounded-md bg-gray-200"></span>
      </p>
    </div>
  );
}
