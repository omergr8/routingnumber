import classes from "./RegistrationBar.module.css";
import { Link } from "react-router-dom";
const RegistrationBar = (props) => {
  const signup = (
    <>
      <div className={classes.logo}>
        <h2>routingnumbers.ca</h2>
      </div>
      <div className={classes.content}>
        <h3>Create new Account</h3>
        <p>
          Already Registered?{" "}
          <Link to="/login">
            <span className={classes.logSign}>Login</span>
          </Link>
        </p>
      </div>
    </>
  );
  const login = (
    <>
      <div className={classes.logo}>
        <h2>routingnumbers.ca</h2>
      </div>
      <div className={classes.content}>
        <h3>Login</h3>
        <p>
          Don't have an account yet?{" "}
          <Link to="/signup">
            <span className={classes.logSign}>Sign up</span>
          </Link>
        </p>
      </div>
    </>
  );
  return (
    <div className={classes.border}>
      {props.incoming === "login" ? login : signup}
    </div>
  );
};
export default RegistrationBar;
