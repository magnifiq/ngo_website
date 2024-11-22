import { useEffect, useState } from "react";

import { fetchGallery } from "../../../api/gallery/apiGallery";

const useGalleryLogic = () => {
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then((response) => {
        setGalleries(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching galleries:", error);
        setIsLoading(false);
      });
  }, []);
  return {
    galleries,
    isLoading,
  };
};

export default useGalleryLogic;
