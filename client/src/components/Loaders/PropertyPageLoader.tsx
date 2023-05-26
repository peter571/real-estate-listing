import React from "react";

export default function PropertyPageLoader() {
  return (
    <div className="fixed top-20 w-2/3 overflow-y-auto h-screen no-scrollbar animate-pulse">
      {/*Property images*/}
      <div className="flex flex-col">
        <div className="h-96">
          <div className="object-cover h-96 w-full bg-gray-200 rounded-md" />
        </div>
        {/*Details of the property.*/}
        <div className="py-3 font-bold gap-6">
          <span className="flex flex-row items-center gap-2 rounded-md my-2">
            <span className="h-5 w-5 rounded-md bg-gray-200"></span>
            <span className="bg-gray-200 h-4 w-12 rounded-md"></span>
          </span>

          <span className="rounded-md block bg-gray-200 h-4 w-12 my-2"></span>

          <span className="rounded-md block bg-gray-200 h-4 w-12 my-2"></span>

          <div className="w-2/3 flex justify-between items-center my-2">
            <span className="rounded-md bg-gray-200 h-4 w-12"></span>
            <span className="rounded-md bg-gray-200 h-4 w-12"></span>
            <span className="rounded-md bg-gray-200 h-4 w-12"></span>
          </div>
          <button className="px-2 py-3 bg-gray-200 w-24 rounded-md my-2"></button>
        </div>
      </div>
      <div className="py-5">
        <p className="bg-gray-200 h-3 w-2/3 my-1 rounded-md"></p>
        <p className="bg-gray-200 h-3 w-2/3 my-1 rounded-md"></p>
        <p className="bg-gray-200 h-3 w-2/3 my-1 rounded-md"></p>
      </div>
    </div>
  );
}
