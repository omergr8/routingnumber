import classes from "./Decoded.module.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
const Decoded = () => {
  return (
    <div className={classes.main}>
      <h1>
        Your routing numbers, <span>decoded</span>.
      </h1>
      <div className={classes.border}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item xs={12} lg={4}>
            <p className={classes.firstP}>123</p>
            <p className={classes.secondP}>Transit No.</p>
          </Grid>
          <Grid item xs={12} lg={4}>
            <p className={classes.firstP}>456</p>
            <p className={classes.secondP}>Institution No.</p>
          </Grid>
          <Grid item xs={12} lg={4}>
            <p className={classes.firstP}>789123</p>
            <p className={classes.secondP}>Account No.</p>
          </Grid>
        </Grid>
      </div>
      <div className={classes.mobileBorder}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item xs={7} lg={7}>
            <p className={classes.secondP}>Transit No.</p>
          </Grid>
          <Grid item xs={5} lg={5}>
            <p className={classes.firstP}>123</p>
          </Grid>
          <Grid item xs={7} lg={7}>
            <p className={classes.secondP}>Institution No.</p>
          </Grid>
          <Grid item xs={5} lg={5}>
            <p className={classes.firstP}>456</p>
          </Grid>
          <Grid item xs={7} lg={7}>
            <p className={classes.secondP}>Account No.</p>
          </Grid>
          <Grid item xs={5} lg={5}>
            {" "}
            <p className={classes.firstP}>789123</p>
          </Grid>
        </Grid>
      </div>
      <div className={classes.downloadButton}>
        <Button variant="contained">Download PDF</Button>
      </div>
      <div className={classes.scanButton}>
        <Button>Scan another cheque</Button>
      </div>
    </div>
  );
};
export default Decoded;
