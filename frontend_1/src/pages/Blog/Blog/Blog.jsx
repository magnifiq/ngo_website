import React, { useEffect, useState } from "react";

import { fetchBlogs, fetchBlogsByCategory } from "../../../api/blog/apiBlog";

import Pagination from "@mui/material/Pagination";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import CardsCollection from "../../../components/CardsCollection/CardsCollection";
import PageHeader from "../../../components/PageHeader/PageHeader";

import styles from "./Blog.module.css";
import { categories } from "../constants/categories";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    fetchBlogs()
      .then((response) => {
        setBlogs(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      fetchBlogsByCategory(selectedCategory)
        .then((response) => {
          setBlogs(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blogs by category:", error);
          setIsLoading(false);
        });
    }
  }, [selectedCategory]);

  return (
    <div className={styles.sections}>
      <div className={styles.header_content}>
        <PageHeader
          subtitle="Блог"
          mainTitle="Наші розповіді"
          className={styles.header}
        />
        <div className={styles.sortByCategory}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {!isLoading && blogs.length > 0 && (
        <CardsCollection data={currentItems} extension_path="blog" />
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
export default Blog;
