import { fetchEventsArticle } from "../../api/events/apiEvents";
import PageDetail from "../../components/PageDetail/PageDetail";

const EventsDetail = () => {
  return <PageDetail fetchData={fetchEventsArticle} />;
};

export default EventsDetail;
