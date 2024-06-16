import { fetchProjectsArticle } from "../../api/projects/apiProjects";
import PageDetail from "../../components/PageDetail/PageDetail";

const ProjectsDetail = () => {
  return <PageDetail fetchData={fetchProjectsArticle} />;
};

export default ProjectsDetail;
