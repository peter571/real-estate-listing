import { useState } from 'react'
import { filterData, getFilterValues } from '../../Utils'

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData)

    return (
        <div className='flex flex-wrap justify-between gap-2 py-2'>
            {
                filters.map((filter) => (
                    <div key={filter.queryName} className=''>
                        <select
                            className='p-[2px] outline-[1px]'
                            placeholder={filter.placeholder}
                            id="">
                            <option disabled selected>{filter.placeholder}</option>
                            {filter?.items?.map((item) => (
                                <option value={item.value} key={item.value}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))
            }
        </div>
    )
}

export default SearchFilters