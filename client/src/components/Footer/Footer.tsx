import React from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { AiOutlineCopyright } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="h-56 flex flex-col justify-center items-center gap-2">
      {/* <h1 className="text-[#31353B] font-bold text-3xl sm:text-5xl text-center">Get Our Newsletter</h1>
      <p className="text-[#31353B] font-bold text-lg sm:text-xl text-center">
        To join the real estate community in 254
      </p>
      <div className="flex flex-row gap-4">
        <TextInput
        className="text-input"
          id="email"
          type="email"
          icon={HiMail}
          placeholder="name@example.com"
          required={true}
          
        />
        <Button className="full-btn">Send</Button>
      </div> */}
      <span className="flex justify-center items-center align-middle text-sm text-center mt-10">
        <AiOutlineCopyright size={16} /> 254 Realtors
      </span>
    </footer>
  );
}
