import classes2 from "./Login.module.css";
import RegistrationBar from "../../Common/RegistrationBar/RegistrationBar";
import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../Authentication/Auth";
import firebaseConfig from "../../../config";
import { TextField, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(() => {})
        .catch((error) => {
          setErrorMessage(error.message);
          handleClick();
        });
    } catch (error) {
      console.log("error is");
    }
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/uploadcheque" />;
  }
  return (
    <div>
      <RegistrationBar incoming="login" />
      <div className={classes2.form}>
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <div>
            <p className={classes2.label}>please enter your email</p>
            <TextField
              className="inputRounded"
              id="standard-required"
              placeholder="Enter Email"
              variant="outlined"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className={classes2.label}>please enter your password</p>
            <TextField
              className="inputRounded"
              id="standard-required"
              placeholder="Enter Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              className={classes2.login}
              type="submit"
              size="large"
              variant="contained"
            >
              Login
            </Button>
          </div>
          <div className={classes2.skip}>
            <Link to="/routingnumber">
              <Button>skip for now</Button>
            </Link>
          </div>
          <div className={classes2.bottomText}>
            <LockIcon style={{ color: "#FF4F63" }} />
            <span>Learn more about security</span>
          </div>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errormessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Login;
