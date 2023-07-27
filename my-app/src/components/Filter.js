import React, { useState } from 'react';

const Filter = ({ data, setFilteredData }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchText(searchTerm);

        const filteredResults = data.filter(item => {
            for (const key in item) {
                if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
                    if (item[key].toLowerCase().includes(searchTerm.toLowerCase())) {
                        return true;
                    }
                } else if (key === 'id' && String(item[key]).includes(searchTerm)) {
                    return true;
                }
            }
            return false;
        });
        setFilteredData(filteredResults);
    };

    return (
        <div className="search">
            <input
                type="text"
                value={searchText}
                onChange={handleSearch}
                placeholder="Поиск"

            />
            <span className="search"></span>
        </div>
    );
};

export default Filter;
