import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from "./Filter";


const Table = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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

    return (
        <div>
            <Filter data={data} setFilteredData={setFilteredData} />
            <table className="table table-bordered">
                <thead>
                <tr className="thead-dark">
                    <th>ID</th>
                    <th>Заголовок</th>
                    <th>Описание</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

