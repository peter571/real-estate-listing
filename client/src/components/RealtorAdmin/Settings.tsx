import React from "react";
import pic from "../../assets/images/estate.jpg";
import { Button } from "flowbite-react";

export default function Settings() {
  return (
    <section className="p-5">
      <h1 className="mb-5 font-extrabold">General</h1>
      <div className="inline gap-3">
        <img className="h-20 w-20 object-cover rounded-md" src={pic} alt="" />
        <div>
          <label
            className="font-medium text-blue-600 hover:underline"
            htmlFor="profile"
            role="button"
          >
            Change profile picture
          </label>
          <input className="hidden" id="profile" name="profile" type="file" />
        </div>

        <div className="my-5">
          <label className="block font-medium" htmlFor="companyName">
            Company Name
          </label>
          <input
            className="rounded-md"
            id="companyName"
            name="companyName"
            type="text"
            value="Koecha Holdings"
          />
        </div>

        <div className="">
          <h1 className="font-extrabold mb-3">Account</h1>
          <span
            className="block font-medium hover:text-blue-600 hover:underline"
            role="button"
          >
            Deactivate account
          </span>
          <span
            className="block font-medium hover:text-blue-600 hover:underline"
            role="button"
          >
            Close account
          </span>
        </div>
        <Button className="full-btn mt-14">Save</Button>
      </div>
    </section>
  );
}
