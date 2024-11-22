import styles from "./Library.module.css";

import PageHeader from "../../components/PageHeader/PageHeader";

import { usefulLinks } from "./constants/usefulLinks";
import { Link } from "react-router-dom";

const Library = () => {
  return (
    <div className={styles.library}>
      <div className={styles.library_content}>
        <PageHeader subtitle="Бібліотека" mainTitle="Корисні посилання" />
        <div className={styles.links}>
          {Object.entries(usefulLinks).map(([key, value]) => (
            <div className={styles.link_container}>
              <Link key={key} to={value} className={styles.link}>
                {key}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
