import React, { useState, useEffect, useContext } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Authentication/Auth";
import classes from "./Decoded.module.css";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },

  titleHead: {
    fontSize: 24,
    textAlign: "center",
  },
  textt: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
});

const MyDoc = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.titleHead}>Cheque Table </Text>

      <Text style={styles.textt}>
        <h2>Transit Number: </h2>
        {props.transit}{" "}
      </Text>
      <Text style={styles.textt}>
        <h2>Institution Number: </h2>
        {props.institution}{" "}
      </Text>
      <Text style={styles.textt}>
        <h2>Account Number: </h2>
        {props.account}{" "}
      </Text>
    </Page>
  </Document>
);

const Decoded = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [transit, setTransit] = useState("");
  const [institution, setInstitution] = useState("");
  const [account, setAccount] = useState("");
  if (!currentUser) {
    <Redirect to="/login" />;
  }
  useEffect(() => {
    setTransit(props.chequeResponse.transit_number);
    setInstitution(props.chequeResponse.institution_number);
    setAccount(props.chequeResponse.account_number);
  }, [props]);
  const scanCheque = () => {
    props.changeVisiblityStatus();
  };
  const downloadPdf = () => (
    <div>
      <PDFDownloadLink
        style={{ textDecoration: "none" }}
        document={
          <MyDoc
            transit={transit}
            institution={institution}
            account={account}
          />
        }
        fileName="routing_numbers.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <Button variant="contained">Download PDF</Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
  return (
    <div className={classes.main}>
      <h1>
        Your routing numbers, <span>decoded</span>.
      </h1>
      <div className={classes.border}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item xs={12} lg={4}>
            <p className={classes.firstP}>{transit}</p>
            <p className={classes.secondP}>Transit No.</p>
          </Grid>
          <Grid item xs={12} lg={4}>
            <p className={classes.firstP}>{institution}</p>
            <p className={classes.secondP}>Institution No.</p>
          </Grid>
          <Grid item xs={12} lg={4}>
            <p className={classes.firstP}>{account}</p>
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
            <p className={classes.firstP}>{transit}</p>
          </Grid>
          <Grid item xs={7} lg={7}>
            <p className={classes.secondP}>Institution No.</p>
          </Grid>
          <Grid item xs={5} lg={5}>
            <p className={classes.firstP}>{institution}</p>
          </Grid>
          <Grid item xs={7} lg={7}>
            <p className={classes.secondP}>Account No.</p>
          </Grid>
          <Grid item xs={5} lg={5}>
            {" "}
            <p className={classes.firstP}>{account}</p>
          </Grid>
        </Grid>
      </div>
      <div className={classes.downloadButton}>{downloadPdf()}</div>
      <div className={classes.scanButton}>
        <Button onClick={scanCheque}>Scan another cheque</Button>
      </div>
    </div>
  );
};
export default Decoded;
