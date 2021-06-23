import classes2 from "./Login.module.css";
import RegistrationBar from "../../Common/RegistrationBar/RegistrationBar";
import React from "react";
import { TextField, Button } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const Login = () => {
  const classes = useStyles();
  return (
    <div>
      <RegistrationBar incoming="login" />
      <div className={classes2.form}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <p className={classes2.label}>please enter your email</p>
            <TextField
              className="inputRounded"
              id="standard-required"
              defaultValue="Your Email"
              variant="outlined"
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
            />
          </div>
          <div>
            <Button className={classes2.login} size="large" variant="contained">
              login
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
export default Login;
