import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import {
  mainMenuSections,
  subMenuSectionsPagesLinks,
  subMenuSectionsProjectsLinks,
  mainMenuSectionsLinks,
  subMenuSectionsPages,
  subMenuSectionsProjects,
  mobileMenuSections,
  mobileMenuSectionsLinks,
} from "./constants/menuSections";

import styles from "./Header.module.css";

import useHeaderLogic from "./hooks/useHeaderLogic";

const Header = () => {
  const location = useLocation();
  const [anchorElProjects, setAnchorElProjects] = useState(null);
  const [anchorElPages, setAnchorElPages] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { hasSubMenu, handleMenuClose, isHereLink, hasId, getCurrSection } =
    useHeaderLogic(
      setAnchorElProjects,
      setAnchorElPages,
      mainMenuSectionsLinks,
      mainMenuSections,
      subMenuSectionsPages,
      subMenuSectionsPagesLinks,
      subMenuSectionsProjects,
      subMenuSectionsProjectsLinks,
      location
    );
  const isActiveLink = (section, link) => {
    if (location.pathname === link) {
      return styles.link_active;
    } else if (
      section === "Сторінки" &&
      subMenuSectionsPagesLinks.includes(location.pathname)
    ) {
      return styles.link_active;
    } else if (
      section === "Наші проекти" &&
      subMenuSectionsProjectsLinks.includes(location.pathname)
    ) {
      return styles.link_active;
    }
    return styles.link_inactive;
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {mobileMenuSections.map((section, index) => (
          <ListItem key={section}>
            <Link
              key={section}
              onClick={handleMobileMenuToggle}
              id={hasId(section)}
              to={mobileMenuSectionsLinks[index]}
              className={`${styles.menu_link} ${isActiveLink(
                section,
                mobileMenuSectionsLinks[index]
              )}`}
            >
              {section}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className={styles.navbar}
    >
      <Toolbar className={styles.toolbar}>
        <div className={styles.toolbarContent}>
          <div className={styles.logo}>
            <img
              className={styles.logo_img}
              src="/assets/header/logo_2.png"
              alt="logo"
            />
          </div>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuToggle}
            className={styles.burgerMenu}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Drawer
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
            anchor="right"
          >
            {DrawerList}
          </Drawer>
          <div className={styles.menu_links}>
            {mainMenuSections.map((section, index) => (
              <Link
                key={section}
                id={hasId(section)}
                to={isHereLink(section, index)}
                onClick={hasSubMenu(section)}
                className={`${styles.menu_link} ${isActiveLink(
                  section,
                  mainMenuSectionsLinks[index]
                )}`}
              >
                {section}
              </Link>
            ))}
          </div>

          <div className={styles.contacts}>
            <Button
              variant="outlined"
              className={styles.btn_contacts}
              component={Link}
              to="https://www.facebook.com/women.in.community.zd/"
            >
              Наші контакти
            </Button>
          </div>
          <Menu
            anchorEl={anchorElProjects}
            open={Boolean(anchorElProjects)}
            onClose={handleMenuClose}
          >
            {subMenuSectionsProjects.map((section, idx) => (
              <MenuItem
                key={section}
                onClick={handleMenuClose}
                component={Link}
                to={subMenuSectionsProjectsLinks[idx]}
              >
                {section}
              </MenuItem>
            ))}
          </Menu>
          <Menu
            anchorEl={anchorElPages}
            open={Boolean(anchorElPages)}
            onClose={handleMenuClose}
          >
            {subMenuSectionsPages.map((section, idx) => (
              <MenuItem
                key={section}
                onClick={handleMenuClose}
                component={Link}
                to={subMenuSectionsPagesLinks[idx]}
              >
                {section}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Toolbar>
      {location.pathname === "/" ? (
        ""
      ) : (
        <Typography variant="h4" className={styles.pageTitle}>
          {getCurrSection()}
        </Typography>
      )}
    </AppBar>
  );
};

export default Header;
