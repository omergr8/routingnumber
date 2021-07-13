import classes from "../Routingnumber.module.css";
import Grid from "@material-ui/core/Grid";
const StepCard = () => {
  return (
    <div>
      <div className={classes.outerContainer}>
        <h1>Decode your routing numbers in 3 simple steps.</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            {" "}
            <div className={classes.card}>
              <div className={classes.cardHeader}>
                <div className={classes.cardImage}> </div>
                <h2>Snap a pic</h2>
                <div className={classes.divider}></div>
              </div>
              <div className={classes.innerContainer}>
                <p>
                  Take a picture of a void cheque on a dark surface. Make sure
                  the numbers are clear and legible.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            {" "}
            <div className={classes.card}>
              <div className={classes.cardHeader}>
                <div className={classes.cardImage2}> </div>
                <h2>Upload image</h2>
                <div className={classes.divider}></div>
              </div>
              <div className={classes.innerContainer}>
                <p>
                  Click the “upload cheque image" button above to select the
                  image file from your computer or smartphone. We can scan PNG
                  and PDF image files.
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            {" "}
            <div className={classes.card}>
              <div className={classes.cardHeader}>
                <div className={classes.cardImage3}> </div>
                <h2>Get routing numbers</h2>
                <div className={classes.divider2}></div>
              </div>
              <div className={classes.innerContainer}>
                <p>
                  The cheque scanner will extract the routing numbers from your
                  image and give them to you in an easy-to-read PDF that you can
                  take to the bank for your next wire transfer.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default StepCard;
