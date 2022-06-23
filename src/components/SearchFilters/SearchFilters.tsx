import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { propertyActions } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers';
import { FilteredDataProp, FiltersProp } from '../../types';
import { filterData, getFilterValues } from '../../Utils'
import Property from '../Property/Property';
import Properties from '../Properties/Properties';
import Loader from '../Loader';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData)
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [filterValues, setFilterValues] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        areaMax: '',
        roomsMin: '',
        bathsMin: '',
        category: ''
    });

    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state: RootState) => state.properties);

    const searchProperties = (filterValues: FiltersProp) => {
        setSearching(true);
        const filteredProperties = [...items].filter((item) => {
            // eslint-disable-next-line eqeqeq
            return item.price <= parseFloat(filterValues.maxPrice) || item.price >= parseFloat(filterValues.minPrice) || item.category == filterValues.category || item.type === filterValues.type || item.bathrooms >= parseFloat(filterValues.bathsMin) || item.rooms >= parseFloat(filterValues.roomsMin) || item.sqft <= parseFloat(filterValues.areaMax);
        })
        setSearching(false);
        setFilteredData(filteredProperties);
    };

    const handleChange = (e: React.ChangeEvent<{ name: string, value: unknown }>) => {
        setFilteredData([]);
        setFilterValues({ ...filterValues, [e.target.name]: e.target.value });
    }

    const checkFilterValues = (Values: FiltersProp) => {
        let property: keyof typeof Values;
        for (property in Values) {
            if (Values[property]) {
                return true;
                break;
            }
        }
        return false;
    }

    const searchFilters = checkFilterValues(filterValues);

    useEffect(() => {
        dispatch(propertyActions.fetchItems());
    }, []);

    useEffect(() => {
        searchProperties(filterValues)
    }, [filterValues]);

    const FilteredProperties = () => {

        return (
            <div>
                {filteredData.length === 0 ? (
                    <>
                        {searching ? <Loader /> : <p>No properties found...</p>}
                    </>
                ) : (
                    <div className='flex gap-6 flex-wrap'>
                        {filteredData?.map((item) => (
                            <Property key={item._id} {...item} />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-2 py-2'>
            <div className='flex flex-wrap gap-4 mb-4'>
                {
                    filters.map((filter) => (
                        <div key={filter.queryName}>
                            <select
                                className='p-[2px] outline-[1px]'
                                placeholder={filter.placeholder}
                                onChange={handleChange}
                                name={filter.queryName}
                            >
                                <option value="" defaultValue="">{filter.placeholder}</option>
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

            {searchFilters ? <FilteredProperties /> : <Properties />}

        </div>
    )
}

export default SearchFilters;
