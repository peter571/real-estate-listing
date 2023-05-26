import React from "react";

export default function RealtorLoader() {
  return (
    <div className="flex flex-col items-center pb-10 px-5 animate-pulse">
      <div className="bg-gray-200 h-24 w-24 rounded-full py-2" />
      <h5 className="mb-1 text-center w-2/3 h-4 bg-gray-200 my-2 rounded-sm"></h5>

      <p className="text-center w-2/3 h-4 bg-gray-200 my-1 rounded-sm"></p>

      <p className="text-center w-2/3 h-4 bg-gray-200 my-1 rounded-sm"></p>
      <a target="_blank" className="w-2/3 h-4 bg-gray-200 my-1 rounded-sm"></a>
    </div>
  );
}
