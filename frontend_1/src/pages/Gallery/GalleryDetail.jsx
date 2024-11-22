import { fetchGalleryArticle } from "../../api/gallery/apiGallery";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import styles from "./GalleryDetail.module.css";

const GalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchGalleryArticle(id)
      .then((response) => {
        setGallery(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
        setError(error);
        setLoading(false);
      });
  }, [id, baseURL]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading gallery: {error.message}</div>;
  }

  const images = gallery.images;

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery_content}>
        <div className={styles.gallery_title}>
          <Typography variant="h4">{gallery.title}</Typography>
        </div>
        <div className={styles.cards}>
          {images.map((image) => (
            <div className={styles.card}>
              <img
                src={`${baseURL}${image}`}
                alt={image}
                className={styles.card_img}
              />
            </div>
          ))}
        </div>
        <Link to={gallery.drive_link} className={styles.gallery_link}>
          <Typography variant="h6">Більше фотографій з події</Typography>
        </Link>
      </div>
    </div>
  );
};

export default GalleryDetail;
