import React, { useState } from "react";
import estate_picture from "../../assets/images/estate.jpg";
import estate_picture1 from "../../assets/images/luxury-home1.jpg";
import estate_picture2 from "../../assets/images/residence.jpg";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function Hero() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[500px] relative">
      <blockquote className="text-5xl sm:text-6xl font-bold leading-[69px] text-center text-white backdrop-contrast-50 bg-white/30 p-2">
        {" "}
        Discover your perfect home.
      </blockquote>
      <div className="relative w-1/2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-2 pl-10 text-md text-gray-900 border-0 rounded-lg bg-[#f3f3f3] focus:ring-0 focus:border-0"
          placeholder="Enter an address, city or category"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && searchTerm) {
              navigate("/search-properties/" + searchTerm.toLowerCase());
            }
          }}
          required
        />
      </div>
      <img
        className="absolute inset-x-0 inset-y-0 -z-10 h-full w-full object-cover rounded-md saturate-50"
        src={estate_picture1}
        alt=""
      />
    </div>
  );
}
