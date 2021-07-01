import classes2 from "./Signup.module.css";
import RegistrationBar from "../../Common/RegistrationBar/RegistrationBar";
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../../../config";
import { db } from "../../../config";
import { TextField, Button } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../../Authentication/Auth";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const Signup = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserr, setCurrentUserr] = useState(null);
  const { currentUser } = useContext(AuthContext);
  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("i am if");
  //     return (
  //       <Redirect
  //         to={{
  //           pathname: "/uploadcheque",
  //           state: "signup",
  //         }}
  //       />
  //     );
  //   }
  // }, []);
  const writeUserData = (userId) => {
    db.ref("users/" + userId).set({
      name: name,
      email: email,
    });
  };
  const handleSubmit = () => {
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          setCurrentUserr(true);
          writeUserData(res.user.uid);
        });
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    if (currentUserr) {
      return (
        <Redirect
          to={{
            pathname: "/uploadcheque",
            state: { reason: "signup successfully" },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/uploadcheque",
            state: { reason: "redirect" },
          }}
        />
      );
    }
  }

  return (
    <div>
      <RegistrationBar />
      <div className={classes2.form}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <p className={classes2.label}>please enter your name</p>
            <TextField
              className="inputRounded"
              id="standard-required"
              defaultValue="Your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p className={classes2.label}>please enter your email</p>
            <TextField
              className="inputRounded"
              id="standard-required"
              defaultValue="Your Email"
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
              defaultValue="Hello World"
              variant="outlined"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              className={classes2.signup}
              size="large"
              variant="contained"
              onClick={handleSubmit}
            >
              sign up free
            </Button>
          </div>
          <div className={classes2.skip}>
            <Button>skip for now</Button>
          </div>
          <div className={classes2.bottomText}>
            <LockIcon style={{ color: "#FF4F63" }} />
            <span>Learn more about security</span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
