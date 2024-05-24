import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {fetchNewsArticle} from "../api/news/apiNews";

const NewsDetail = () => {
  const { id } = useParams(); 
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchNewsArticle(id)
      .then((response) => {
        setNews(response.data);
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
  const imageUrl = `${baseURL}${news.image_url}`;

  return (
    <div>
      <h1>{news.title}</h1>
      <img src={imageUrl} alt={news.title} />
      <p>{news.text}</p>
      <small>
        Created on: {new Date(news.creation_date).toLocaleDateString()}
      </small>
      {news.edit_date && (
        <small>
          Edited on: {new Date(news.edit_date).toLocaleDateString()}
        </small>
      )}
    </div>
  );
};

export default NewsDetail;
