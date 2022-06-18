import React, { useState } from 'react'
import { BsFilter } from 'react-icons/bs'
import Property from '../Property/Property'
import SearchFilters from '../SearchFilters/SearchFilters'

const Search = () => {
    const [searchFilters, setSearchFilters] = useState(false)

    return (
        <div>
            <div
                className='flex justify-center gap-2 cursor-pointer items-center'
                onClick={() => setSearchFilters(!searchFilters)}>
                <p className='font-bold'>Search Property by Filters</p>
                <BsFilter />
            </div>
            {searchFilters && (<SearchFilters />)}
            {/* <Properties /> */}
        </div>
    )
}

export default Search