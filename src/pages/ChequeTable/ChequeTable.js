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
import Firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import classes2 from "./ChequeTable.module.css";
import { AiOutlineDownload } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: "20px",
    backgroundColor: "#FFF0E8",
  },
  tableCell: {
    borderBottom: "4px solid white",
  },
});
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
        <h2>Date: </h2>
        {props.date}{" "}
      </Text>
      <Text style={styles.textt}>
        <h2>FileName: </h2>
        {props.file}{" "}
      </Text>
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

const iconButton = (
  <IconButton
    className={classes2.iconButton}
    aria-label="download"
    component="span"
  >
    <AiOutlineDownload className={classes2.icon} />
  </IconButton>
);
const downloadPdf = (date, file, transit, institution, account) => (
  <div>
    <PDFDownloadLink
      document={
        <MyDoc
          date={date}
          file={file}
          transit={transit}
          institution={institution}
          account={account}
        />
      }
      fileName="somename.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : iconButton
      }
    </PDFDownloadLink>
  </div>
);
const mobileDownloadButton = (
  <IconButton
    className={classes2.mobileButton}
    aria-label="download"
    component="span"
  >
    <AiOutlineDownload className={classes2.mobileIcon} />
  </IconButton>
);

const ChequeTable = () => {
  const classes = useStyles();
  const [chequedata, setChequeData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  var uid;
  if (currentUser !== null) {
    uid = currentUser.uid;
  }
  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, []);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const getData = () => {
    Firebase.database()
      .ref("users/" + uid)
      .once("value")
      .then((snapshot) => {
        var myData = Object.keys(snapshot.val().chequeTable).map((key) => {
          return snapshot.val().chequeTable[key];
        });
        setChequeData(myData);
      });
  };

  return (
    <div className={classes2.main}>
      <div className={classes2.cheque}>
        <h2>Your decoded cheques</h2>
        <div>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className={classes.tableCell}>
                  <TableCell align="center">DATE</TableCell>
                  <TableCell align="center">FILE</TableCell>
                  <TableCell align="center">TRANSIT NO.</TableCell>
                  <TableCell align="center">INSTITUTION NO.</TableCell>
                  <TableCell align="center">ACCOUNT NO.</TableCell>
                  <TableCell align="center">PDF</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chequedata.map((row, index) => (
                  <TableRow className={classes.tableCell} key={index}>
                    <TableCell align="center">{row.uploadDate}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.transitNumber}</TableCell>
                    <TableCell align="center">{row.institutionNo}</TableCell>
                    <TableCell align="center">{row.accountNumber}</TableCell>
                    <TableCell align="center">
                      {downloadPdf(
                        row.uploadDate,
                        row.name,
                        row.transitNumber,
                        row.institutionNo,
                        row.accountNumber
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className={classes2.mobileTable}>
        <h2 className={classes2.mobileTitle}>Your uploads</h2>
        {chequedata.map((row, index) => (
          <div key={index} className={classes2.border}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <h2 className={classes2.date}>{row.uploadDate}</h2>
              </Grid>
              <Grid item xs={6}>
                <h2 className={classes2.link}>
                  <Link href="#" color="inherit">
                    {row.name}
                  </Link>
                </h2>
              </Grid>
              <Grid item xs={6}>
                <div className={classes2.secondRow}>
                  <h2>
                    Institution No. <span>{row.institutionNo}</span>
                  </h2>
                  <h2>
                    Transit no. <span>{row.transitNumber}</span>
                  </h2>
                  <h2>
                    account No. <span>{row.accountNumber}</span>
                  </h2>
                </div>
              </Grid>
              <Grid item xs={6}>
                {mobileDownloadButton}
              </Grid>
            </Grid>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChequeTable;
