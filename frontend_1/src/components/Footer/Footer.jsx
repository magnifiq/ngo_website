import styles from "./Footer.module.css";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import mainSectionsFooter from "./constants/mainSectionsFooter";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={`${styles.logo} ${styles.part}`}>
          <img
            className={styles.logo_img}
            src="/assets/header/logo_2.png"
            alt="logo"
          />
        </div>
        <div className={`${styles.main_sections} ${styles.part}`}>
          <Typography variant="h6" className={styles.header}>
            Основні розділи
          </Typography>
          <div className={styles.links}>
            {Object.entries(mainSectionsFooter).map(([link, section]) => (
              <Link to={link} key={section} className={styles.section_link}>
                {section}
              </Link>
            ))}
          </div>
        </div>
        <div className={`${styles.contacts} ${styles.part}`}>
          <Typography variant="h6" className={styles.header}>
            Контакти
          </Typography>
          <Typography variant="body1">+380976342611</Typography>
          <Typography variant="body1">
            Aдреса: м. Здолбунів, Рівненська область
          </Typography>
          <Typography variant="body1">
            Електронна адреса: women.zd@gmail.com
          </Typography>
        </div>
        <div className={`${styles.follow} ${styles.part}`}>
          <Typography variant="h6" className={styles.header}>
            Зв'яжіться з нами
          </Typography>
          <img
            className={styles.footer_img}
            src="/assets/footer/facebook.jpg"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
