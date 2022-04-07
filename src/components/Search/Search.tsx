import { useState } from 'react'
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '../SearchFilters/SearchFilters'

const Search = () => {
    const [filters, setFilters] = useState(false)
    return (
        <div>
            <div className='flex justify-center gap-2 cursor-pointer items-center' onClick={() => setFilters(!filters)}>
                <p className='font-bold'>Search Property by Filters</p>
                <BsFilter />
            </div>
            {filters && (<SearchFilters />)}
        </div>
    )
}

export default Search