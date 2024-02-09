import React, { useState } from "react";
import { Tooltip } from "flowbite-react";
import { FiSearch } from "react-icons/fi";
import SelectInput from "components/Inputs/SelectInput";
import { filterData } from "@/utils";
import { useSearch } from "context/SearchContext";
import { useNavigate } from "react-router-dom";
import { BsFilterSquare } from "react-icons/bs";

export default function SearchBar() {
  const { data, dispatch } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-4 lg:grid-cols-10 my-3 gap-4 px-4">
      <li className="col-span-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            value={data.search_term}
            type="search"
            id="searchTerm"
            name="searchTerm"
            className="block w-full p-2 pl-10 text-md text-gray-900 border-0 rounded-lg bg-[#f3f3f3] focus:ring-0 focus:border-0"
            placeholder="Enter an address, city or category"
            onKeyUp={(e) => {
              if (e.key === "Enter" && searchTerm) {
                navigate("/search-properties/" + searchTerm.toLowerCase());
                dispatch({ type: "SearchTerm", payload: searchTerm });
              }
            }}
            onChange={(e) => {
              dispatch({ type: "SearchTerm", payload: e.target.value });
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </li>
      {filterData.map((data) => (
        <li key={data.queryName}>
          <SelectInput {...data} />
        </li>
      ))}
      <li className="flex items-center justify-center">
        <Tooltip content="Reset filters." placement="bottom">
          <span
            onClick={() => dispatch({ type: "Reset" })}
            role="button"
            className="flex gap-2 flex-row font-semibold"
          >
            <BsFilterSquare size={25} />
            Reset
          </span>
        </Tooltip>
      </li>
    </ul>
  );
}
