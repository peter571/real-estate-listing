import React from 'react'
import Properties from '../components/Properties'

export default function Home() {
  return (
    <div className='flex flex-row'>
        <div className='basis-1/2'>
        <Properties />
        </div>
        <div className='basis-1/2'>
            Map Goes Here
        </div>
    </div>
  )
}
