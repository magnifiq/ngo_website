import React, { useEffect, useState } from "react";

import styles from "./Main.module.css";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";

import { fetchLatestNews } from "../../api/news/apiNews";
import { fetchlatestFivePhotos } from "../../api/gallery/apiGallery";

import PageHeader from "../../components/PageHeader/PageHeader";
import CardsCollection from "../../components/CardsCollection/CardsCollection";
import BasicCard from "../../components/BasicCard/BasicCard";

import { mainDirections, mainDirectionsImgs } from "./constants/mainDirections";
import sponsors from "./constants/sponsors";
const Main = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [latestPhotos, setLatestPhotos] = useState([]);
  const [latestPhotosTitle, setLatestPhotosTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGallery, setCurrentPageGallery] = useState(1);
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    fetchLatestNews()
      .then((response) => {
        setLatestNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchlatestFivePhotos()
      .then((response) => {
        const { title, images } = response.data;
        setLatestPhotos(images);
        setLatestPhotosTitle(title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(latestNews.length / 4))
    );
  };

  const handlePrevPageGallery = () => {
    setCurrentPageGallery((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPageGallery = () => {
    setCurrentPageGallery((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(latestPhotos.length))
    );
  };

  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const currentNews = latestNews.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainPhoto}>
          <Typography variant="h3" className={styles.mainPhoto_header}>
            Жінки в громаді
          </Typography>
          <Typography variant="h6" className={styles.mainPhoto_text}>
            Будуємо громаду, де жінки будуть почутими
          </Typography>
          <Button
            className={styles.btn_contacts}
            component={Link}
            to="https://www.facebook.com/women.in.community.zd/"
          >
            Наші контакти
          </Button>
        </div>
        <div className={styles.aboutUs}>
          <div className={styles.aboutUs_photos}>
            <div className={styles.aboutUs_upperPhoto}>
              <img
                src="../assets/mainPage/upperPhoto.jpg"
                alt="upperPhoto"
                className={styles.aboutUs_photo}
              />
            </div>
            <div className={styles.aboutUs_lowerPhoto}>
              <img
                src="../assets/mainPage/lowerPhoto.jpg"
                alt="lowerPhoto"
                className={styles.aboutUs_photo}
              />
            </div>
          </div>
          <div className={styles.aboutUs_info}>
            <PageHeader subtitle="Про нас" mainTitle="Жінки в громаді" />
            <Typography variant="body1" className={styles.aboutUs_text}>
              Ми, громадська організація «Жінки в громаді», котра лобіює
              інтереси жінок та просуває принципи гендерної рівності. Членкині
              нашої організації виступають за задоволення суспільних інтересів
              жінок у економічній, трудовій, політичній, культурній та освітній
              сферах життя.
            </Typography>
            <Button
              className={styles.btn_contacts}
              component={Link}
              to="/aboutUs"
            >
              Читати далі
            </Button>
          </div>
        </div>

        <div className={styles.ourNews}>
          <div className={styles.ourNews_content}>
            <div className={styles.ourNews_header}>
              <PageHeader
                subtitle="Наші заходи"
                mainTitle="Дізнавайтеся про наші заходи першими"
                className={styles.ourNews_title}
              />
              <div className={styles.pagination}>
                <IconButton
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  <ArrowBackIosRoundedIcon />
                </IconButton>
                <IconButton
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(latestNews.length / 4)}
                  className={styles.paginationButton}
                >
                  <ArrowForwardIosRoundedIcon />
                </IconButton>
              </div>
            </div>
            <div className={styles.ourNews_cards}>
              <CardsCollection data={currentNews} extension_path="news" />
            </div>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.gallery_content}>
            <div className={styles.gallery_header}>
              <PageHeader
                subtitle="Наша галерея"
                mainTitle="Останні фото"
                className={styles.gallery_title}
              />
            </div>
            <div className={styles.gallery_mainPart}>
              <div
                className={`${styles.gallery_pagginationBack} ${styles.gallery_paggination}`}
              >
                <IconButton
                  onClick={handlePrevPageGallery}
                  disabled={currentPageGallery === 1}
                  className={styles.gallery_paggination}
                >
                  <ArrowBackIosRoundedIcon />
                </IconButton>
              </div>
              <div className={styles.gallery_mainContent}>
                {latestPhotos.length > 0 ? (
                  <div className={styles.gallery_photo}>
                    <img
                      src={`${baseURL}${latestPhotos[currentPageGallery - 1]}`}
                      alt="gallery_photo"
                      className={styles.gallery_photo_img}
                    />
                  </div>
                ) : (
                  "No photos"
                )}

                <div className={styles.gallery_event}>
                  <Typography
                    variant="body1"
                    className={styles.gallery_event_text}
                  >
                    {latestPhotosTitle}
                  </Typography>
                </div>
              </div>
              <div
                className={`${styles.gallery_pagginationForward} ${styles.gallery_paggination}`}
              >
                <IconButton
                  onClick={handleNextPageGallery}
                  disabled={currentPageGallery === latestPhotos.length}
                  className={styles.gallery_paggination}
                >
                  <ArrowForwardIosRoundedIcon />
                </IconButton>
              </div>
            </div>
            <div className={styles.paginationDots}>
              {Array.from({ length: latestPhotos.length }).map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${
                    currentPageGallery === index + 1 ? styles.active : ""
                  }`}
                  onClick={() => setCurrentPageGallery(index + 1)}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.directions}>
          <div className={styles.directions_content}>
            <div className={styles.directions_title}>
              <PageHeader
                subtitle="Наші засади діяльності"
                mainTitle="Ми працюємо над розвитком громади та підтримкою жінок"
              />
            </div>
            <div className={styles.directions_cards}>
              {mainDirections.map((direction, index) => (
                <BasicCard
                  key={direction}
                  img_src={mainDirectionsImgs[index]}
                  img_alt={direction}
                  card_text={direction}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.sponsors}>
          <div className={styles.sponsors_content}>
            <div className={styles.sponsors_header}>
              <PageHeader
                subtitle="Наші спонсори"
                mainTitle="Ініціативи, які нас підтримують"
                className={styles.sponsors_title}
              />
            </div>

            <div className={styles.sponsors_cards}>
              {Object.entries(sponsors).map(([sponsor, img_src]) => (
                <div className={styles.sponsors_card}>
                  <img
                    src={img_src}
                    alt={sponsor}
                    className={styles.sponsors_card_img}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
