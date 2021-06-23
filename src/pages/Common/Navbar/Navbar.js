import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
  Typography,
  Link,
  Button,
  Drawer,
  ListItemText,
  ListItem,
  List,
  Grid,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    background:
      "linear-gradient(90deg,rgba(255, 165, 135, 1) 0%,rgba(255, 21, 105, 1) 100%)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: "15px",
    textTransform: "uppercase",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      textTransform: "uppercase",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menu: {
    display: "flex",
    flexWrap: "wrap",
    listStyleType: "none",
  },
  anchorList: {
    display: "block",
    padding: "0px 10px",
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "15px",
  },
  anchorListLogin: {
    display: "block",
    padding: "0px 20px",
    textDecoration: "none",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
  },

  signupButton: {
    borderRadius: "50px",
    height: "35px",
    marginTop: "10px",
    backgroundColor: "white",
    color: "#FF0065",
  },
  mobileMenuButton: {
    borderRadius: "50px",
    height: "30px",
    marginTop: "0px",
    backgroundColor: "white",
    color: "#FF0065",
  },
  mobileMenu: {
    zIndex: "99999",
    position: "relative",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background:
      " linear-gradient(180deg, rgba(255,165,135,1) 0%, rgba(255,21,105,1) 100%)",
    color: "white",
    zIndex: "1",
  },
  button: {
    backgroundColor: "white",
    marginTop: "10px",
  },
  mobileLogo: {
    textAlign: "center",
    textTransform: "uppercase",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.mobileMenu}
    >
      <MenuItem onClick={handleMenuClose}>History</MenuItem>
      <MenuItem onClick={handleMenuClose}>Help</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
  const list = (
    <div className={classes.list}>
      <div className={classes.mobileLogo}>
        <Typography variant="h6" noWrap>
          routingnumbers.ca
        </Typography>
      </div>
      <Grid container justify="center" alignItems="center" spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Button
            className={classes.signupButton}
            size="small"
            onClick={handleProfileMenuOpen}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            className={classes.signupButton}
            size="small"
            onClick={handleProfileMenuOpen}
            variant="contained"
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <List>
        <ListItem button>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Glossary" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Security" />
        </ListItem>
      </List>
    </div>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <React.Fragment>
      <Drawer
        classes={{ paper: classes.paper }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {list}
      </Drawer>
    </React.Fragment>
  );
  const preventDefault = (event) => event.preventDefault();
  const links = (
    <ul className={classes.menu}>
      <li>
        <Link className={classes.anchorList} href="#" onClick={preventDefault}>
          Blog
        </Link>
      </li>
      <li>
        <Link className={classes.anchorList} href="#" onClick={preventDefault}>
          Glosarry
        </Link>
      </li>
      <li>
        <Link className={classes.anchorList} href="#" onClick={preventDefault}>
          Security
        </Link>
      </li>
      <li>
        <Link
          className={classes.anchorListLogin}
          href="#"
          onClick={preventDefault}
        >
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            routingnumbers.ca
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {links}
            <Button
              className={classes.signupButton}
              size="small"
              onClick={handleProfileMenuOpen}
              variant="contained"
            >
              Sign Up
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <Button
              className={classes.mobileMenuButton}
              size="small"
              variant="contained"
              onClick={handleMobileMenuOpen}
              startIcon={<PersonIcon />}
              endIcon={<MenuIcon />}
            ></Button>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
