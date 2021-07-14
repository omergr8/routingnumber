import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { AuthContext } from "../../../Authentication/Auth";
import firebaseConfig from "../../../config";
import {
  Typography,
  Button,
  Drawer,
  ListItemText,
  ListItem,
  List,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";

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
    color: "white",
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
    padding: "0px 20px",
    textDecoration: "none",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
  },
  anchorListLogin: {
    display: "block",
    paddingLeft: "20px",
    // paddingRight: "100px",
    textDecoration: "none",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
  },

  signupButton: {
    borderRadius: "5px",
    marginLeft: "100px",
    height: "45px",
    width: "auto",
    minWidth: "114px",
    fontWeight: "700",
    marginTop: "3px",
    backgroundColor: "white",
    color: "#FF0065",
    "&:hover": {
      background: "#F9B58A",
      color: "white",
    },
  },
  mobileSignupButton: {
    borderRadius: "5px",
    // marginLeft: "100px",
    height: "45px",
    width: "auto",
    minWidth: "90px",
    fontWeight: "700",
    marginTop: "3px",
    backgroundColor: "white",
    color: "#FF0065",
  },

  signupButtonLink: {
    fontWeight: "700",
    marginTop: "3px",
    // backgroundColor: "white",
    color: "#FF0065",
    textDecoration: "none",
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
  const { currentUser } = useContext(AuthContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSignOut = () => {
    firebaseConfig
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const handleProfileMenuOpen = (event) => {
    if (currentUser) {
      setAnchorEl(event.currentTarget);
    }
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
      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
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
        {!currentUser ? (
          <Grid item xs={5}>
            <Button
              className={classes.mobileSignupButton}
              size="small"
              onClick={handleProfileMenuOpen}
              variant="contained"
            >
              <Link to="/login" className={classes.signupButtonLink}>
                Login
              </Link>
            </Button>
          </Grid>
        ) : null}
        {!currentUser ? (
          <Grid item xs={5}>
            <Button
              className={classes.mobileSignupButton}
              size="small"
              onClick={handleProfileMenuOpen}
              variant="contained"
            >
              <Link to="/signup" className={classes.signupButtonLink}>
                Sign Up
              </Link>
            </Button>
          </Grid>
        ) : (
          <Grid item xs={5}>
            <Button
              className={classes.mobileSignupButton}
              size="small"
              onClick={handleSignOut}
              variant="contained"
            >
              Sign Out
            </Button>
          </Grid>
        )}

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
        <ListItem button>
          <Link
            to="/chequetable"
            style={{ color: "white", textDecoration: "none" }}
          >
            <ListItemText primary="History" />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </div>
  );

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
          Glossary
        </Link>
      </li>
      <li>
        <Link className={classes.anchorList} href="#" onClick={preventDefault}>
          Security
        </Link>
      </li>
      <li>
        <Link className={classes.anchorList} to="/chequetable">
          History
        </Link>
      </li>
      <li>
        <Link className={classes.anchorList} href="#" onClick={preventDefault}>
          Help
        </Link>
      </li>
      {!currentUser ? (
        <li>
          <Link className={classes.anchorListLogin} to="/login">
            Login
          </Link>
        </li>
      ) : null}
    </ul>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Link
            to={currentUser ? "/uploadcheque" : "/routingnumber"}
            style={{ textDecoration: "none" }}
          >
            <Typography className={classes.title} variant="h6" noWrap>
              routingnumbers.ca
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {links}

            {currentUser ? (
              <Button
                className={classes.signupButton}
                size="small"
                variant="contained"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                className={classes.signupButton}
                size="small"
                variant="contained"
              >
                <Link to="/signup" className={classes.signupButtonLink}>
                  Sign Up
                </Link>
              </Button>
            )}
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
