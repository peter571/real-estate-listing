import React from 'react'
import { TextInput } from 'flowbite-react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar() {
  return (
    <ul className='grid grid-cols-8'>
        <li className='relative border rounded-md'>
        <TextInput className='pl-7 focus:outline-none' placeholder='Search...' />
        <FiSearch size={30} className='absolute inset-y-1 left-0 flex items-center pl-2' />
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
  )
}
