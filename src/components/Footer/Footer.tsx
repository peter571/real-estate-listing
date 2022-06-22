import React from 'react';
import { AiOutlineCopyright } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='flex justify-center items-center my-8'>
            <AiOutlineCopyright className='items-center' />
            <p className='text-sm text-gray-700'>2022 254 Realtors, Inc.</p>
        </div>
    )
}

export default Footer;
