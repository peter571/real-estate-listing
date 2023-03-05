import React from 'react'
import PropertyCard from '../PropertyCard/PropertyCard'

export default function Properties() {
  return (
    <div className='grid lg:grid-cols-2 gap-6 overflow-y-auto scrollbar-hidden h-full pb-5'>
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
    </div>
  )
}
