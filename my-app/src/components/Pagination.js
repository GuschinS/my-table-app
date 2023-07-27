import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        onPageChange(currentPage + 1);
    };

    const getPageNumbersToShow = () => {
        const maxPageNumbers = 5;
        const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);

        let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
        let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbers);

        if (endPage - startPage < maxPageNumbers - 1) {
            if (currentPage <= halfMaxPageNumbers) {
                endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
            } else {
                startPage = Math.max(1, endPage - maxPageNumbers + 1);
            }
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage <= 1}>
                Назад
            </button>
            <div className="pages-number">
                {getPageNumbersToShow().map(page => (
                    <span
                        key={page}
                        style={{ cursor: 'pointer', color: currentPage === page ? '#7EBC3C' : '#474955' }}
                        onClick={() => onPageChange(page)}
                    >
          {page}
        </span>
                ))}
            </div>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
                Далее
            </button>
        </div>
    );
};

export default Pagination;
