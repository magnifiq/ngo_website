import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {fetchNews} from "../api/news/apiNews";


const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
   fetchNews()
      .then((response) => setNews(response.data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {news.map((item) => (
          <li key={item._id}>
            <Link to={`/news/${item._id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
