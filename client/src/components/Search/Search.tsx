import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useSearch } from 'context/SearchContext';

export default function Search() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const { dispatch } = useSearch()
    
  return (
    <div className="relative w-3/4 md:w-2/3 lg:w-1/2 pt-2">
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
              dispatch({ type: "SearchTerm", payload: searchTerm })
            }
          }}
          required
        />
      </div>
  )
}
