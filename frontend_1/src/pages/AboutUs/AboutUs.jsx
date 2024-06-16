import { useState } from "react";

import { Link } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";

import styles from "./AboutUs.module.css";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { people } from "./constants/people";
import { annualResults } from "./constants/annualResults";

const AboutUs = () => {
  const [currentPageGallery, setCurrentPageGallery] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const personKeys = Object.keys(people);
  const currentPersonKey = personKeys[currentPageGallery - 1];
  const currentPerson = people[currentPersonKey];
  const handlePrevPageGallery = () => {
    setCurrentPageGallery((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPageGallery = () => {
    setCurrentPageGallery((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(personKeys.length))
    );
  };

  const people_names = Object.keys(people);
  return (
    <div className={styles.aboutUs}>
      <div className={styles.aboutUs_content}>
        <div className={styles.aboutUs_values}>
          <div className={styles.aboutUs_values_content}>
            <div className={styles.values_photo}>
              <img
                src="../assets/aboutUs/first.jpg"
                alt="values_photo"
                className={styles.values_photo_img}
              />
            </div>
            <div className={styles.values_info}>
              <div className={styles.values_info_title}>
                <PageHeader
                  subtitle="Наші цінності та місія"
                  mainTitle="Те, до чого ми прагнемо"
                />
              </div>
              <div className={styles.values_info_text}>
                Ми прагнемо досягнення гендерної рівності у сферах економіки,
                освіти, культури та мистецтв шляхом захисту прав жінок,
                проведення адвокаційних та інформаційних кампаній, освітніх
                заходів, створення толерантної спільноти у громадах Рівненщини,
                які поважають права людини й просувають ідеї рівності.
              </div>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <div className={styles.card_content}>
                    <div className={styles.card_header}>
                      <div className={styles.card_icon}>
                        <img
                          src="../assets/aboutUs/goal.svg"
                          alt="goal"
                          className={styles.card_icon_img}
                        />
                      </div>
                      <div className={styles.card_title}>Наша місія</div>
                    </div>
                    <div className={styles.card_text}>
                      Підтримка та посилення спроможностей жінок у сферах
                      економіки, політики, освіти та культури для створення
                      світу рівних можливостей
                    </div>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.card_content}>
                    <div className={styles.card_header}>
                      <div className={styles.card_icon}>
                        <img
                          src="../assets/aboutUs/vission.svg"
                          alt="vission"
                          className={styles.card_icon_img}
                        />
                      </div>
                      <div className={styles.card_title}>Наше бачення</div>
                    </div>
                    <div className={styles.card_text}>
                      Суспільство рівних прав та можливостей для різних людей
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.aboutUs_history}>
          <div className={styles.aboutUs_history_content}>
            <div className={styles.values_info}>
              <div className={styles.values_info_title}>
                <PageHeader
                  subtitle="Напрями діяльності"
                  mainTitle="Що ми робимо"
                />
              </div>
              <div className={styles.values_info_text}>
                <ul>
                  <li>надання освітніх та консультативних послуг</li>
                  <li>
                    розробка освітніх та інформаційних продуктів, їх просування
                  </li>
                  <li>проведення публічних заходів</li>
                  <li>проведення адвокаційних та інформаційних кампаній</li>
                  <li>
                    розвиток партнерств з іншими організаціями, бізнесами та ОМС
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.values_photo}>
              <img
                src="../assets/aboutUs/second.jpg"
                alt="values_photo"
                className={styles.values_photo_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.gallery_content}>
            <div className={styles.gallery_header}>
              <PageHeader
                subtitle="Наші учасниці"
                mainTitle="Хто ми"
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
                <div className={styles.gallery_person}>
                  <img
                    src={currentPerson.img}
                    alt={currentPerson.text}
                    className={styles.gallery_person_img}
                  />
                  <Typography variant="h6" className={styles.person_name}>
                    {currentPersonKey}
                  </Typography>
                  <Typography variant="body1" className={styles.person_text}>
                    {currentPerson.text}
                  </Typography>
                </div>
              </div>
              <div
                className={`${styles.gallery_pagginationForward} ${styles.gallery_paggination}`}
              >
                <IconButton
                  onClick={handleNextPageGallery}
                  disabled={currentPageGallery === personKeys.length}
                  className={styles.gallery_paggination}
                >
                  <ArrowForwardIosRoundedIcon />
                </IconButton>
              </div>
            </div>
            <div className={styles.paginationDots}>
              {Array.from({ length: people.length }).map((_, index) => (
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
        <div className={styles.results}>
          <div className={styles.results_content}>
            <div className={styles.values_photo}>
              <img
                src="../assets/aboutUs/third.jpg"
                alt="pdf_photo"
                className={styles.values_photo_img}
              />
            </div>
            <div className={styles.results_info}>
              <div className={styles.results_header}>
                <PageHeader
                  subtitle="Наші річні звіти"
                  mainTitle="Що ми вже зробили"
                  className={styles.results_title}
                />
              </div>
              <div className={styles.results_sums}>
                {Object.entries(annualResults).map(([year, result]) => (
                  <div className={styles.results_sum}>
                    <div className={styles.results_header}>
                      <img src="../assets/aboutUs/pdf.svg" alt="icon_pdf" />
                      <Link to={result} className={styles.link_result}>
                        {year}
                      </Link>
                    </div>
                    <div className={styles.borderLine}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
