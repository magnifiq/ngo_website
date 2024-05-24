const useHeaderLogic = (
    setAnchorElProjects, setAnchorElPages, mainMenuSectionsLinks, mainMenuSections,
    subMenuSectionsPages, subMenuSectionsPagesLinks, subMenuSectionsProjects,
    subMenuSectionsProjectsLinks, location) => {

    const hasSubMenu = (section) => {
        if (section === "Наші проекти" || section === "Сторінки") {
            return handleMenuClick;
        }
    };

    const handleMenuClick = (event) => {
        const target = event.currentTarget.id;
        if (target === "ourProjects") {
            setAnchorElProjects(event.currentTarget);
        } else if (target === "pages") {
            setAnchorElPages(event.currentTarget);
        }
    };
    const handleMenuClose = () => {
        setAnchorElProjects(null);
        setAnchorElPages(null);
    };
    const isHereLink = (section, index) => {
        if (section === "Наші проекти" || section === "Сторінки") {
            return null;
        }
        return mainMenuSectionsLinks[index];
    };

    const hasId = (section) => {
        if (section === "Наші проекти") {
            return "ourProjects";
        } else if (section === "Сторінки") {
            return "pages";
        }
    };

    const getCurrSection = () => {
        return mainMenuSections[mainMenuSectionsLinks.indexOf(location.pathname)] ||
            subMenuSectionsPages[
            subMenuSectionsPagesLinks.indexOf(location.pathname)
            ] ||
            subMenuSectionsProjects[
            subMenuSectionsProjectsLinks.indexOf(location.pathname)
            ];
    };

    

    return {
        hasSubMenu,
        handleMenuClose,
        isHereLink,
        hasId,
        getCurrSection
    };
};

export default useHeaderLogic;