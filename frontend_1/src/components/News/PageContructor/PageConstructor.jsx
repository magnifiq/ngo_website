import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

import CardsCollection from "../CardsCollection/CardsCollection";
import PageHeader from "../PageHeader/PageHeader";

import styles from "./PageConstructor.module.css";

const PageConstructor = (
  data,
  isLoading,
  extension_path,
  subtitle,
  mainTitle
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.sections}>
      <PageHeader subtitle={subtitle} mainTitle={mainTitle} />

      {!isLoading && data.length > 0 && (
        <CardsCollection data={data} extension_path={extension_path} />
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className={styles.pagination}
      />
    </div>
  );
};

export default PageConstructor;
