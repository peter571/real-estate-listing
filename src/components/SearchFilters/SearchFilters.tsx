import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FilteredDataProp, FiltersProp } from '../../types';
import { filterData, getFilterValues } from '../../Utils'
import Property from '../Property/Property';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData)
    const [filteredData, setFilteredData] = useState<any[]>([])
    const [filterValues, setFilterValues] = useState({
        purpose: '',
        rentFrequency: '',
        categoryExternalID: '',
        minPrice: '',
        maxPrice: '',
        areaMax: '',
        roomsMin: '',
        bathsMin: '',
        sort: '',
        locationExternalIDs: ''
    })

    // const searchProperties = (filterValues: FiltersProp) => {
    //     const filteredProperties = [].filter((item) => {
    //         // eslint-disable-next-line eqeqeq
    //         return item.type == filterValues.purpose || parseFloat(item.baths) == parseFloat(filterValues.bathsMin) || item.agency == filterValues.rentFrequency || item.area.toString() == filterValues.areaMax;
    //     })

    //     setFilteredData(filteredProperties);
    // };

    const handleChange = (e: React.ChangeEvent<{ name: string, value: unknown }>) => {
        setFilterValues({ ...filterValues, [e.target.name]: e.target.value })

    }
    console.log(filteredData)

    // useEffect(() => {
    //     searchProperties(filterValues)
    // }, [filterValues])

    return (
        <div className='flex flex-wrap justify-between gap-2 py-2'>
            {
                filters.map((filter) => (
                    <div key={filter.queryName} className=''>
                        <select
                            className='p-[2px] outline-[1px]'
                            placeholder={filter.placeholder}
                            onChange={handleChange}
                            name={filter.queryName}
                        >
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
            <div>
                {filteredData?.map((item) => (
                    <Property {...item} />
                ))}
            </div>
        </div>
    )
}

export default SearchFilters