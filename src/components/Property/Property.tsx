import React from 'react';
import { PropertyValues } from "../../types"
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { Link } from "react-router-dom";

const Property = (prop: PropertyValues) => {
    const { price, _id, rooms, bathrooms, title, place, sqft, images } = prop;
    return (
        <div className="flex flex-col">
            <div className="h-auto w-80 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 cursor-pointer">
                <Link to={`/${_id}`}>
                    <img src={images![0]} alt="propert-img" />
                </Link>
            </div>
            <div className="mt-1">
                <div className="flex justify-between items-center my-1">
                    <div className="flex justify-between items-center gap-2">
                        {(<GoVerified className="text-[#2b5f2b]" />)}
                        <p>AED {price}/monthly</p>
                    </div>
                    <div className="cursor-pointer">
                        <img className="rounded-full h-8 w-8" src={images![0]} alt="" />
                    </div>
                </div>
                <div className="flex justify-start items-center gap-4 text-sky-500">
                    {rooms} <FaBed /> | {bathrooms} <FaBath /> | {sqft.toFixed(2)} sqft <BsGridFill />
                </div>
                <p className="truncate w-80">{title}</p>
            </div>
        </div>
    )
}

export default Property
