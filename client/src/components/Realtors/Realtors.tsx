import React from "react";
import Realtor from "./Realtor";

export default function Realtors() {
  return (
    <div>
      <h1 className="whitespace-nowrap text-3xl font-light my-6">
        Meet trusted Realtors around you
      </h1>
      <div className="flex flex-row flex-wrap gap-4">
      <Realtor />
      <Realtor />
      <Realtor />
      </div>
    </div>
  );
}
