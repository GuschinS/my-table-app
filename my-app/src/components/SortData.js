const SortData = (data, sortColumn, sortDirection) => {
    return data.sort((a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        if (typeof columnA === 'string' && typeof columnB === 'string') {
            if (sortDirection === 'asc') {
                return columnA.localeCompare(columnB, undefined, { numeric: true });
            } else {
                return columnB.localeCompare(columnA, undefined, { numeric: true });
            }
        } else {
            if (sortDirection === 'asc') {
                return columnA - columnB;
            } else {
                return columnB - columnA;
            }
        }
    });
};

export default SortData;
