import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItemRange = {
    start: currentPage * itemsPerPage,
    end: Math.min((currentPage + 1) * itemsPerPage, totalItems),
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return {
    currentPage,
    totalPages,
    currentItemRange,
    nextPage,
    previousPage,
  };
};