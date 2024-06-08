import styles from "./Main.module.css";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";

const Main = () => {
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
      </div>
    </div>
  );
};

export default Main;
