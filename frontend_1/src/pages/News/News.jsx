import React, { useEffect, useState } from "react";

import { fetchNews } from "../../api/news/apiNews";

import PageConstructor from "../../components/PageContructor/PageConstructor";

const News = () => {
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
  return (
    <PageConstructor
      data={news}
      isLoading={isLoading}
      extension_path="news"
      subtitle="Новини"
      mainTitle="Актуальні оголошення"
    />
  );
};
export default News;
