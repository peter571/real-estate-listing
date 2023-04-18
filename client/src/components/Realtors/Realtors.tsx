import React from "react";
import Realtor from "./Realtor";
import { useQuery } from "@tanstack/react-query";
import { getRealtors } from "../../api/realtors";

export default function Realtors() {
  const {
    data: realtors,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["realtors"],
    queryFn: getRealtors,
  });

  return (
    <div>
      <h1 className="whitespace-nowrap text-3xl font-light my-6">
        Meet trusted Realtors around you
      </h1>
      <div className="flex flex-row flex-wrap gap-4">
        {realtors &&
          realtors.map((realtor: RealtorDetails, idx: number) => (
            <Realtor key={idx} {...realtor} />
          ))}
      </div>
    </div>
  );
}
