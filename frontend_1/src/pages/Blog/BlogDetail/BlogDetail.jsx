import { useEffect, useState } from "react";

import {
  fetchBlogsArticle,
  fetchCategoryCounts,
} from "../../../api/blog/apiBlog";
import { fetchLatestThreeNews } from "../../../api/news/apiNews";

import PageDetail from "../../../components/PageDetail/PageDetail";

import styles from "./BlogDetail.module.css";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

const BlogDetail = () => {
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  const baseURL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    fetchCategoryCounts()
      .then((response) => {
        setCategoryCounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchLatestThreeNews()
      .then((response) => {
        setLatestNews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className={styles.blog}>
      <div className={styles.blog__content}>
        <div className={styles.blog__detail}>
          <PageDetail fetchData={fetchBlogsArticle} />
        </div>
        <div className={styles.cards}>
          <div className={styles.card_category}>
            <Typography variant="h4" className={styles.card_category_title}>
              <Box sx={{ fontWeight: "bold" }}>Категорії</Box>
            </Typography>

            {categoryCounts.map((category) => (
              <div className={styles.element}>
                <div key={category.category} className={styles.card}>
                  <div className={styles.card__category}>
                    <Typography variant="h6">{category.category}</Typography>
                  </div>
                  <div className={styles.card__count}>
                    <Typography variant="h6">({category.count})</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.card_news}>
            <Typography variant="h5" className={styles.card_news_title}>
              <Box sx={{ fontWeight: "bold" }}>Останні дописи</Box>
            </Typography>
            <div className={styles.card_articles}>
              {latestNews.map((article) => {
                const { title, category, image_url, _id } = article;
                return (
                  <Link
                    to={`/news/${_id}`}
                    className={styles.card_article_link}
                  >
                    <div className={styles.card_article}>
                      <div className={styles.card_article_image_container}>
                        <img
                          src={`${baseURL}${image_url}`}
                          alt={title}
                          className={styles.card_article_image}
                        />
                      </div>
                      <div className={styles.card_info}>
                        <div className={styles.card_article_title}>
                          <Typography variant="h6">{title}</Typography>
                        </div>
                        <div className={styles.card_article_category}>
                          <Typography variant="body1">{category}</Typography>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
