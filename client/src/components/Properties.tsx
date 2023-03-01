import React from 'react'
import PropertyCard from './PropertyCard'

export default function Properties() {
  return (
    <div className='grid grid-cols-2 gap-6'>
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
    </div>
  )
}
