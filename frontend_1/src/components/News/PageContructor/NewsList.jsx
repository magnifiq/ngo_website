import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

import { fetchNews } from "../../api/news/apiNews";

import CardsCollection from "../CardsCollection/CardsCollection";
import PageHeader from "../PageHeader/PageHeader";

import styles from "./NewsList.module.css";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then((response) => {
        setNews(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setIsLoading(false);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.sections}>
      <PageHeader subtitle="Новини" mainTitle="Актуальні оголошення" />

      {!isLoading && news.length > 0 && (
        <CardsCollection data={news} extension_path="news" />
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

export default NewsList;
