import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ADMIN_MENU_ITEMS,
  ADMIN_ROLE,
  DEFAULT_MENU_ITEMS,
  USER_ROLE,
} from "../constants";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Input,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  useTheme,
} from "@mui/material";
import { BiSearch, BiSolidUser } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineProfile } from "react-icons/ai";

export default function DefaultLayout() {
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU_ITEMS);
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = useStyles(theme);

  useEffect(() => {
    if (auth.isLogedIn && auth.user?.role === ADMIN_ROLE) {
      setMenuItems(ADMIN_MENU_ITEMS);
    }
  }, [auth]);

  const handleClickMenuItem = (link, event, openChildren) => {
    if (openChildren) {
      setAnchorEl(event.currentTarget);
    }

    if (openChildren === undefined) {
      setAnchorEl(null);
    }

    if (link) {
      navigate(link);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {};

  return (
    <>
      <header style={styles.header}>
        <Container sx={styles.header__container}>
          <Typography
            sx={styles.header__logo}
            variant="h4"
            component="h1"
            onClick={() => handleClickMenuItem("/")}
          >
            Cinema
          </Typography>
          {auth.user?.role !== ADMIN_ROLE && (
            <Input
              placeholder="Tìm tên phim, tên diễn viên..."
              variant="standard"
              sx={{
                width: "32%",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="search" edge="end">
                    <BiSearch />
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
          <Button
            sx={styles["header__user-button"]}
            startIcon={<BiSolidUser />}
          >
            {auth.isLogedIn ? (
              auth.user?.role === USER_ROLE ? (
                <>
                  <Typography
                    aria-controls={anchorEl ? "user-menu" : undefined}
                    aria-haspopup={"true"}
                    aria-expanded={anchorEl ? "true" : undefined}
                    onClick={(event) => handleClickMenuItem("", event, true)}
                  >
                    {auth.user?.fullname}
                  </Typography>
                  <Menu
                    anchorEl={anchorEl}
                    id={"user-menu"}
                    open={Boolean(anchorEl?.innerText === auth.user?.fullname)}
                    onClose={handleCloseMenu}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: styles["header__user-menu"],
                      },
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                  >
                    <MenuList>
                      <MenuItem
                        onClick={() => handleClickMenuItem("/")}
                        key={"user-profile"}
                      >
                        <ListItemIcon sx={styles["header__user-icon"]}>
                          <AiOutlineProfile />
                        </ListItemIcon>
                        <ListItemText>Thông tin cá nhân</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleClickMenuItem("/")}
                        key={"log-out"}
                      >
                        <ListItemIcon sx={styles["header__user-icon"]}>
                          <AiOutlineLogout />
                        </ListItemIcon>
                        <ListItemText>Đăng xuất</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                auth.user?.fullname
              )
            ) : (
              <Typography onClick={() => handleClickMenuItem("/auth")}>
                Đăng ký/Đăng nhập
              </Typography>
            )}
          </Button>
        </Container>
        <nav>
          <Box sx={styles.nav}>
            <Container sx={styles.nav__container}>
              {menuItems.map((menuItem, index) => {
                return (
                  <Box key={menuItem.content} sx={styles.nav__item}>
                    <Button
                      onClick={(event) =>
                        handleClickMenuItem(
                          menuItem.href,
                          event,
                          menuItem.children ? true : false,
                        )
                      }
                      sx={styles.nav__button}
                      aria-controls={anchorEl ? menuItem.content : undefined}
                      aria-haspopup={"true"}
                      aria-expanded={anchorEl ? "true" : undefined}
                    >
                      {menuItem.content}
                      {menuItem.children && <FaChevronDown size={10} />}
                    </Button>
                    {menuItem.children && (
                      <Menu
                        anchorEl={anchorEl}
                        id={menuItem.content}
                        open={Boolean(
                          anchorEl?.innerText ===
                            menuItem.content.toUpperCase(),
                        )}
                        onClose={handleCloseMenu}
                        slotProps={{
                          paper: {
                            elevation: 0,
                            sx: styles.nav__menu,
                          },
                        }}
                        transformOrigin={{
                          horizontal: "center",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "center",
                          vertical: "bottom",
                        }}
                      >
                        {menuItem.children.map((menuItemChild) => {
                          return (
                            <MenuItem
                              onClick={() =>
                                handleClickMenuItem(menuItemChild.href)
                              }
                              key={menuItemChild.content}
                            >
                              {menuItemChild.content}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    )}
                    {index !== menuItems.length - 1 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={styles.nav__divider}
                        variant="middle"
                      />
                    )}
                  </Box>
                );
              })}
            </Container>
          </Box>
        </nav>
      </header>
      <main>
        <Box sx={styles.main}>
          <Outlet />
        </Box>
      </main>
      <footer>
        <Box sx={styles.footer}>
          <Container>
            <Typography variant="sm">© Thiết kế bởi HAHA</Typography>
          </Container>
        </Box>
      </footer>
    </>
  );
}

const useStyles = (theme) => {
  return {
    header: {},
    header__container: {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    header__logo: {
      fontWeight: "semibold",
      textTransform: "uppercase",
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontStyle: "normal",
      cursor: "pointer",
    },
    "header__user-button": {
      textTransform: "none",
      display: "flex",
      alignItems: "flex-start",
      color: theme.palette.primary.main,
    },
    "header__user-menu": {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
    "header__user-icon": {
      minWidth: "1.5rem !important",
    },
    nav: {
      backgroundColor: theme.palette.primary.main,
    },
    nav__container: {
      display: "flex",
      justifyContent: "space-between",
    },
    nav__item: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    nav__button: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
      display: "flex",
      gap: ".25rem",
      color: "white",
      fontWeight: "medium",
      transition: "all 300ms ease",
      "&:hover": {
        color: theme.palette.primary.hoverText,
      },
      width: "100%",
    },
    nav__menu: {
      borderRadius: 0,
      bgcolor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      width: 230,
    },
    nav__divider: {
      backgroundColor: theme.palette.primary.contrastText,
    },
    main: {
      paddingTop: "2rem",
      paddingBottom: "2rem",
    },
    footer: {
      bgcolor: theme.palette.primary.main,
      p: ".5rem",
      textAlign: "center",
      color: theme.palette.primary.contrastText,
    },
  };
};
