import * as React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

import { Card as MUICard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import styles from "./Card.module.css";
import { buttonNames } from "./constants/buttonNames";

const Card = ({ extension_path, id, data }) => {
  const { title, text, creation_date, category } = data;
  let image_url = null;
  if (extension_path === "gallery") {
    image_url = data.images[0];
  } else {
    image_url = data.image_url;
  }
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const btnName =
    extension_path === "gallery" ? buttonNames[1] : buttonNames[0];
  const sanitizedText = DOMPurify.sanitize(text).substring(0, 50);

  return (
    <MUICard className={styles.card} variant="outlined">
      <CardMedia
        component="img"
        alt={title}
        height="160"
        image={`${baseURL}${image_url}`}
        objectPosition="center"
      />
      <div className={styles.content}>
        <CardContent>
          <div className={styles.card_header}>
            <Typography variant="body2">
              <Box sx={{ fontWeight: "bold" }}>{category}</Box>
            </Typography>
            <Typography variant="body2">
              {new Date(creation_date).toLocaleDateString()}
            </Typography>
          </div>
          <div className={styles.card_info}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={styles.card_title}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.card_text}
            >
              <Box
                component="div"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  maxHeight: "100px",
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedText }}
              ></Box>
            </Typography>
          </div>
        </CardContent>
        <CardActions className={styles.card_btn_wrapper}>
          <Button
            size="small"
            className={styles.card_btn}
            component={Link}
            to={`/${extension_path}/${id}`}
          >
            {btnName}
          </Button>
        </CardActions>
      </div>
    </MUICard>
  );
};

export default Card;
