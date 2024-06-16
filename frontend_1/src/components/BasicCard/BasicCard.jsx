import styles from "./BasicCard.module.css";

import { Typography, Box } from "@mui/material";

const BasicCard = ({ img_src, img_alt, card_text = "" }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <div className={styles.card_img}>
          <img
            src={img_src}
            alt={img_alt}
            className={styles.card_img_content}
          />
        </div>
        <div className={styles.card_text}>
          <Typography variant="h6" className={styles.card_text}>
            <Box sx={{ fontWeight: "bold" }}>{card_text}</Box>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default BasicCard;
