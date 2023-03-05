import React from "react";
import { TextInput } from "flowbite-react";
import { FiSearch } from "react-icons/fi";
import SelectInput from "../Inputs/SelectInput";
import { filterData } from "../../utils";

export default function SearchBar() {
  return (
    <ul className="grid grid-cols-4 lg:grid-cols-9 my-3 gap-4">
      <li className="col-span-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-2 pl-10 text-md text-gray-900 border-0 rounded-lg bg-[#f3f3f3] focus:ring-0 focus:border-0"
            placeholder="Enter an address, city or category"
            required
          />
        </div>
      </li>
      {filterData.map((data) => (
        <li key={data.queryName}>
          <SelectInput {...data} />
        </li>
      ))}
    </ul>
  );
}
