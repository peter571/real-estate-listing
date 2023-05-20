import React, { useState } from "react";
import estate_picture from "../../assets/images/estate.jpg";
import estate_picture1 from "../../assets/images/luxury-home1.jpg";
import estate_picture2 from "../../assets/images/residence.jpg";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useSearch } from "../../contexts/SearchContext";
import Search from "../Search/Search";

export default function Hero() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useSearch()

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-[500px] relative mt-16">
      <blockquote className="text-5xl sm:text-6xl font-bold leading-[69px] text-center text-white backdrop-contrast-50 bg-white/30 p-2 rounded-lg">
        {" "}
        Discover your perfect home.
      </blockquote>
      <Search />
      <img
        className="absolute inset-x-0 inset-y-0 -z-10 h-full w-full object-cover rounded-md saturate-50"
        src={estate_picture1}
        alt=""
      />
    </div>
  );
}
