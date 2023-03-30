import React from "react";
import { Card } from "flowbite-react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Realtor() {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm">
      <Card>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500">
            Visual Designer
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <span
              role="button"
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Follow
            </span>
            <span
              role="button"
              className="inline-flex gap-1 items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
              onClick={() => navigate("/real-estate-agents/1")}
            >
              View properties
              <HiOutlineExternalLink />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
