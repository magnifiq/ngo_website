import PageConstructor from "../../components/PageContructor/PageConstructor";
import useGalleryLogic from "./hooks/useGalleryLogic";

const Gallery = () => {
  const { galleries, isLoading } = useGalleryLogic();
  return (
    <PageConstructor
      data={galleries}
      isLoading={isLoading}
      extension_path="gallery"
      subtitle="Галерея"
      mainTitle="Наші фото"
    />
  );
};
export default Gallery;
