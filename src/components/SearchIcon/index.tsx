import React from 'react';
import { BsFilter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SearchIcon = () => {

    const { link, filter } = searchIconStyles;

    return (
        <Link className={link} to="/search">
            <p className={filter}>Filters</p>
            <BsFilter />
        </Link>
    )
}

const searchIconStyles = {
    link: 'flex gap-2 cursor-pointer items-center py-3',
    filter: 'font-bold'
}

export default SearchIcon;
