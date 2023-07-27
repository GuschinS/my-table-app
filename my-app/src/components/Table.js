import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./Filter";
import SortData from "./SortData";
import Pagination from "./Pagination";

const Table = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortColumn, setSortColumn] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const sortedData = SortData(filteredData, sortColumn, sortDirection);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <Filter data={data} setFilteredData={setFilteredData} setCurrentPage={setCurrentPage} />
            <table className="table table-bordered">
                <thead>
                <tr className="thead-dark">
                    <th onClick={() => handleSort('id')}>ID {sortColumn === 'id' && (sortDirection === 'asc' ? '⋀' : '⋁')}</th>
                    <th onClick={() => handleSort('title')}>Заголовок {sortColumn === 'title' && (sortDirection === 'asc' ? '⋀' : '⋁')}</th>
                    <th onClick={() => handleSort('body')}>Описание {sortColumn === 'body' && (sortDirection === 'asc' ? '⋀' : '⋁')}</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Table;
