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
import Loader from '../Loader';

const PropertyDetails = () => {
    const dispatch = useAppDispatch();

    const { property, loading } = useAppSelector((state: RootState) => state.properties);
    const { id } = useParams();

    useEffect(() => {
        dispatch(propertyActions.fetchItem(id!));
    }, [])

    const { images, bathrooms, rooms, description, price, type, title, sqft, contact } = property!;

    const Property = () => {

        return (
            <div className='lg:mx-8 mx-4 mt-8'>
                <div className='flex justify-center gap-3 items-center flex-col'>
                    <div>
                        <Carousel carouselData={images!} />
                    </div>
                    <div className='self-start'>
                        <p className='capitalize font-semibold'>{title}</p>
                        <p className='text-sm capitalize'>{`Type: ${type}`}</p>
                        <div className="flex justify-between items-center my-1">
                            <div className="flex justify-between items-center gap-2 capitalize">
                                <GoVerified className="text-[#2b5f2b]" />
                                <p>{type === 'for-rent' ? `${price.toLocaleString()} USD/monthly` : `${price.toLocaleString()} USD`}</p>
                            </div>
                        </div>
                        <p className='font-bold'>{`Tel: ${contact}`}</p>
                        <div className="flex justify-start items-center gap-2 text-sky-500">
                            {rooms} <FaBed /> | {bathrooms} <FaBath /> | {sqft.toFixed(2)} sqft <BsGridFill />
                        </div>
                        <p className="capitalize">{description}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            {loading ? <Loader /> : <Property />}
        </div> 
    )
}

export default PropertyDetails
