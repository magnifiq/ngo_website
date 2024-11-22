import { fetchNewsArticle } from "../../api/news/apiNews";
import PageDetail from "../../components/PageDetail/PageDetail";

const NewsDetail = () => {
  return (
    <PageDetail fetchData={fetchNewsArticle} />
  );
};

export default NewsDetail;
