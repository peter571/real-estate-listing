import React from 'react'
import { Spinner } from 'flowbite-react'

export default function SpinnerLoader() {
  return (
    <div className="text-center h-1/3">
    <Spinner aria-label="Center-aligned spinner example" />
  </div>
  )
}
