import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import styles from "./PageHeader.module.css";

const PageHeader = ({ subtitle, mainTitle, className = "" }) => {
  return (
    <div className={`${styles.section_header} ${className}`}>
      <Typography component="subtitle">{subtitle}</Typography>
      <Typography variant="h4" className={styles.main_header}>
        <Box sx={{ fontWeight: "bold" }}>{mainTitle}</Box>
      </Typography>
    </div>
  );
};

export default PageHeader;
