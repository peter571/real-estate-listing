import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import Realtor, { Image } from "../Realtors/Realtor";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRealtor, getRealtorProperties } from "../../api/realtors";
import defaultImg from "../../assets/images/254.png";
import { getRealtorFollowers } from "../../api/realtor_followers";
import { usePagination } from "../../hooks/usePagination";
import { Pagination } from "flowbite-react";
import SpinnerLoader from "../Loader/Spinner";

export default function RealtorProperties() {
  const { id } = useParams();
  const { currentPage, onPageChange } = usePagination();

  const { data: realtor } = useQuery({
    queryKey: ["realtors", id],
    enabled: id !== undefined,
    queryFn: () => getRealtor(id!),
  });
  const { data: realtorProperties, isLoading } = useQuery({
    enabled: id !== null,
    queryKey: ["realtor_properties", currentPage],
    queryFn: () => getRealtorProperties(id!, currentPage),
  });

  const { data: realtorFollowers } = useQuery({
    queryKey: ["follows", id],
    enabled: id !== null,
    queryFn: () => getRealtorFollowers(id!),
  });

  if (isLoading) return <SpinnerLoader />;

  return (
    <div className="grid divide-x grid-cols-5 min-h-screen">

      <aside className="hidden sm:block sm:fixed top-24 left-0 w-1/5">
        {realtor && (
          <div className="flex flex-col items-center pb-10 px-5">
            <Image src={realtor.profile_picture} fallbackSrc={defaultImg} />
            <h5 className="mb-1 text-xl font-medium text-gray-900 text-center">
              {realtor.company_name}
            </h5>
            {realtorFollowers && realtorFollowers.length > 0 && (
              <p className="text-center">
                Followers{" "}
                <span className="font-bold text-sm">
                  {realtorFollowers.length}
                </span>
              </p>
            )}
            <p
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
              className="text-sm text-gray-500 overflow-hidden text-ellipsis text-center"
            >
              {realtor.description}
            </p>
            <a
              href={"https://" + realtor.website_url}
              target="_blank"
              className="text-blue-500 hover:underline text-sm"
            >
              {realtor.website_url}
            </a>
          </div>
        )}
      </aside>

      <section className="w-full sm:w-4/5 right-0 top-24 fixed overflow-y-auto h-screen pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 pb-4">
          {realtorProperties &&
            realtorProperties["properties"].map(
              (property: PropertyDetailsCard) => (
                <PropertyCard key={property.id} {...property} />
              )
            )}
        </div>
        <div className="flex items-center justify-center text-center py-10 mb-8">
          {realtorProperties["pages"] > 1 && (
            <Pagination
              currentPage={currentPage}
              layout="pagination"
              onPageChange={onPageChange}
              showIcons={true}
              totalPages={realtorProperties["pages"]}
              previousLabel="Go back"
              nextLabel="Go forward"
            />
          )}
        </div>
      </section>

    </div>
  );
}
