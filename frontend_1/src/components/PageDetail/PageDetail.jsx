import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import styles from "./PageDetail.module.css";

const PageDetail = ({ fetchData }) => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchData(id)
      .then((response) => {
        setContent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError(error);
        setLoading(false);
      });
  }, [id, baseURL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading news: {error.message}</div>;
  }
  const imageUrl = `${baseURL}${content.image_url}`;
  const { title, text } = content;
  return (
    <div className={styles.content_container}>
      <div className={styles.content}>
        <Typography
          variant="h4"
          className={`${styles.text_content} ${styles.content_header}`}
        >
          {title}
        </Typography>
        <div className={styles.content_img_container}>
          <img src={imageUrl} alt={title} className={styles.content_img} />
        </div>
        <div
          className={styles.text_content}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default PageDetail;
