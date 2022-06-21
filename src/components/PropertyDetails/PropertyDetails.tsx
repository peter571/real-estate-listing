import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../Carousel/Carousel'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { MdKeyboardBackspace } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers';
import { propertyActions } from '../../store';

const PropertyDetails = () => {
    const dispatch = useAppDispatch();

    const { property } = useAppSelector((state: RootState) => state.properties); 
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(propertyActions.fetchItem(id!));
    }, [])

    const { images, bathrooms, rooms, description, price, type, title, sqft, contact } = property!;

    return (
        <div className='lg:mx-32 mt-8'>
            <Link to="/">
                <button className='text-black font-bold flex items-center'>
                    <MdKeyboardBackspace /> back
                </button>
            </Link>
            <div className='flex justify-center gap-2 items-center flex-col'>
                <div className=''>
                    <Carousel carouselData={images!} />
                </div>
                <div className=''>
                    <p className='font-semibold'>{title}</p>
                    <p className='text-sm'>{type}</p>
                    <div className="flex justify-between items-center my-1">
                        <div className="flex justify-between items-center gap-2">
                            {(<GoVerified className="text-[#2b5f2b]" />)}
                            <p>AED {price}/monthly</p>
                        </div>
                    </div>
                    <p className='font-bold'>{contact}</p>
                    <div className="flex justify-start items-center gap-2 text-sky-500">
                        {rooms} <FaBed /> | {bathrooms} <FaBath /> | {sqft.toFixed(2)} sqft <BsGridFill />
                    </div>
                    <p className="">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails
