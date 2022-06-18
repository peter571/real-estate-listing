import React from 'react';
import { useParams } from 'react-router-dom'
import { PropertyPropDetails } from '../../types'
import Carousel from '../Carousel/Carousel'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { MdKeyboardBackspace } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import { propertyDetails } from '../../data'
import { Link } from 'react-router-dom'

const PropertyDetails = (prop: PropertyPropDetails) => {
    const { price, rooms, contact, title, baths, area, isVerified, description, type, purpose, photos } = propertyDetails;
    const params = useParams()
    console.log(params.id)
    return (
        <div className='lg:mx-32 mt-8'>
            <Link to="/">
                <button className='text-black font-bold flex items-center'>
                    <MdKeyboardBackspace /> back
                </button>
            </Link>
            <div className='flex justify-center gap-2 items-center flex-col'>
                <div className=''>
                    <Carousel carouselData={photos} />
                </div>
                <div className=''>
                    <p className='font-semibold'>{title}</p>
                    <p className='text-sm'>{type}</p>
                    <div className="flex justify-between items-center my-1">
                        <div className="flex justify-between items-center gap-2">
                            {isVerified && (<GoVerified className="text-[#2b5f2b]" />)}
                            <p>AED {price}/monthly</p>
                        </div>
                    </div>
                    <p className='font-bold'>{purpose}</p>
                    <p className='font-bold'>{contact}</p>
                    <div className="flex justify-start items-center gap-2 text-sky-500">
                        {rooms} <FaBed /> | {baths} <FaBath /> | {area.toFixed(2)} sqft <BsGridFill />
                    </div>
                    <p className="">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails
