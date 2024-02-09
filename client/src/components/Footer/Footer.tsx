import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="h-56 flex flex-col justify-center items-center gap-2 bg-gray-800 rounded-md">
      <span className="flex justify-center items-center align-middle text-sm text-center mt-10 text-white">
        <AiOutlineCopyright size={16} /> 254 Realtors
      </span>
    </footer>
  );
}
