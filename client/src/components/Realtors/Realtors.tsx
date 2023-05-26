import React from "react";
import Realtor from "./Realtor";
import { useQuery } from "@tanstack/react-query";
import { getRealtors } from "../../api/realtors";
import SpinnerLoader from "../Loaders/Spinner";
import RealtorCardLoader from "../Loaders/RealtorCardLoader";

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
      <h1 className="text-3xl my-6 font-semibold py-3">
        Meet trusted Realtors around you
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading && Array(4)
            .fill(<RealtorCardLoader />)
            .map((el, idx) => <div key={idx}>{el}</div>)}
        {!isLoading && realtors &&
          realtors.map((realtor: RealtorDetails, idx: number) => (
            <Realtor key={idx} {...realtor} />
          ))}
      </div>
    </div>
  );
}
