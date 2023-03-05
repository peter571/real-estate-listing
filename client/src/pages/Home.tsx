import React from 'react'
import Map from '../components/Map/Map'
import Properties from '../components/Properties/Properties'

export default function Home() {
  return (
    <div className='flex flex-row gap-6 h-[80%]'>
        <div className='basis-1/2 h-full'>
        <Properties />
        </div>
        <div className='basis-1/2 h-full rounded-lg'>
            <Map />
        </div>
    </div>
  )
}
