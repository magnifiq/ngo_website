import React, { useEffect, useState } from "react";

import { fetchProjects } from "../../api/projects/apiProjects";

import PageConstructor from "../../components/PageContructor/PageConstructor";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((response) => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      });
  }, []);
  return (
    <PageConstructor
      data={projects}
      isLoading={isLoading}
      extension_path="projectsDescription"
      subtitle="Опис проектів"
      mainTitle="Що ми зробили"
    />
  );
};
export default Projects;
