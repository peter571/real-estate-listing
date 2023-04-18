import React, { useEffect, useState } from "react";
import pic from "../../assets/images/estate.jpg";
import { Button } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";

const initialValues = {
  company_name: "",
  description: "",
  profile_picture: "",
  website_url: "",
  company_mail: "",
  contact: "",
};

export default function Settings() {
  const { realtorUser } = useAuth();
  const [newChanges, setNewChanges] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [realtorDetails, setRealtorDetails] =
    useState<RealtorFormValues>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChanges(true);
    setRealtorDetails({ ...realtorDetails, [e.target.name]: e.target.value });
  };

  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setRealtorDetails({
          ...realtorDetails,
          profile_picture: reader.result as string,
        });
        setImgSrc(reader.result as string);
        setNewChanges(true);
      };
    }
  };

  //Update the input fields with current realtor details
  useEffect(() => {
    setNewChanges(false);
    if (realtorUser) {
      setRealtorDetails({
        company_name: realtorUser.company_name,
        description: realtorUser.description,
        profile_picture: realtorUser.profile_picture,
        website_url: realtorUser.website_url,
        company_mail: realtorUser.company_mail,
        contact: realtorUser.contact,
      });
    }
  }, []);

  return (
    <section className="p-5">
      <h1 className="mb-5 font-extrabold">General</h1>
      <div className="inline gap-3">
        <img
          className="h-20 w-20 object-cover rounded-md"
          src={imgSrc ? imgSrc : realtorDetails.profile_picture}
          alt=""
        />
        <span
          role="button"
          className="text-red-500 text-sm my-2"
          onClick={() => {
            setRealtorDetails({ ...realtorDetails, profile_picture: ""})
            setImgSrc("")
          }}
        >
          Remove picture
        </span>
        <div>
          <label
            className="font-medium text-blue-600 hover:underline"
            htmlFor="profile_picture"
            role="button"
          >
            Change profile picture
          </label>
          <input
            className="hidden"
            id="profile_picture"
            name="profile_picture"
            type="file"
            onChange={handleImageChange}
            //value={realtorDetails.profile_picture}
          />
        </div>

        <div className="my-5">
          <label className="block font-medium" htmlFor="company_name">
            Company Name
          </label>
          <input
            className="rounded-md"
            id="company_name"
            name="company_name"
            type="text"
            value={realtorDetails.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="my-5">
          <label className="block font-medium" htmlFor="description">
            Description
          </label>
          <input
            className="rounded-md"
            id="description"
            name="description"
            type="text"
            value={realtorDetails.description}
            onChange={handleChange}
          />
        </div>

        <div className="my-5">
          <label className="block font-medium" htmlFor="company_mail">
            Company mail
          </label>
          <input
            className="rounded-md"
            id="company_mail"
            name="company_mail"
            type="text"
            value={realtorDetails.company_mail}
            onChange={handleChange}
          />
        </div>

        <div className="my-5">
          <label className="block font-medium" htmlFor="contact">
            Contact
          </label>
          <input
            className="rounded-md"
            id="contact"
            name="contact"
            type="text"
            value={realtorDetails.contact}
            onChange={handleChange}
          />
        </div>

        <div className="my-5">
          <label className="block font-medium" htmlFor="website_url">
            Contact
          </label>
          <input
            className="rounded-md"
            id="website_url"
            name="website_url"
            type="url"
            value={realtorDetails.website_url}
            onChange={handleChange}
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
        <Button
          type="button"
          className="full-btn mt-14"
          disabled={!newChanges}
          onClick={() => console.log(realtorDetails)}
        >
          Save
        </Button>
      </div>
    </section>
  );
}
