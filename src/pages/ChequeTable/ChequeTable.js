import React from "react";
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

function createData(id, date, file, transit, institution, account, pdf) {
  return { id, date, file, transit, institution, account, pdf };
}
const iconButton = (
  <IconButton
    className={classes2.iconButton}
    aria-label="download"
    component="span"
  >
    <AiOutlineDownload className={classes2.icon} />
  </IconButton>
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
const rows = [
  createData(1, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(2, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(3, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(4, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(5, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(6, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(7, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
  createData(8, "May 14,2021", "Cheque345.jpg", 123, 456, 789123, iconButton),
];

const ChequeTable = () => {
  const classes = useStyles();

  // const mobileView = (

  // )
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
                {rows.map((row) => (
                  <TableRow className={classes.tableCell} key={row.id}>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.file}</TableCell>
                    <TableCell align="center">{row.transit}</TableCell>
                    <TableCell align="center">{row.institution}</TableCell>
                    <TableCell align="center">{row.account}</TableCell>
                    <TableCell align="center">{row.pdf}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className={classes2.mobileTable}>
        <h2 className={classes2.mobileTitle}>Your uploads</h2>
        {rows.map((row) => (
          <div key={row.id} className={classes2.border}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <h2 className={classes2.date}>{row.date}</h2>
              </Grid>
              <Grid item xs={6}>
                <h2 className={classes2.link}>
                  <Link href="#" color="inherit">
                    {row.file}
                  </Link>
                </h2>
              </Grid>
              <Grid item xs={6}>
                <div className={classes2.secondRow}>
                  <h2>
                    Institution No. <span>{row.institution}</span>
                  </h2>
                  <h2>
                    Transit no. <span>{row.transit}</span>
                  </h2>
                  <h2>
                    account No. <span>{row.account}</span>
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
