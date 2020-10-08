import React from 'react'

const SearchFilter = ({ currentSearch, searchChange }) => {

    return (
        <div>
            filter shown with <input value={currentSearch} onChange={searchChange} />
        </div>
    )

}

export default SearchFilter