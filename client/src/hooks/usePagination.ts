import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  return { currentPage, onPageChange };
};
