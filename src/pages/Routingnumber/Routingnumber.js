import React, { useState, useRef } from "react";
import axios from "axios";
import classes from "./Routingnumber.module.css";
import {
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  Modal,
  Fade,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockIcon from "@material-ui/icons/Lock";
import chequeImage from "../../Assets/test.JPG";
import Decoded from "../Decoded/Decoded";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));
const Routingnumber = () => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [chequeres, setChequeRes] = useState([]);
  const [isuploaddone, setIsUploadDone] = useState(false);
  const classes2 = useStyles();

  const uploadcheque = (file) => {
    let fileName;
    if (file.path) {
      fileName = file.path;
    } else if (file.name) {
      fileName = file.name;
    }
    const data = new FormData();
    data.append("file", file);
    let url = "https://routing.mazumago.com/upload";
    setOpen(true);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post(url, data, config)
      .then((res) => {
        setChequeRes(res.data);
        setIsUploadDone(true);
        setOpen(false);
      })
      .catch((err) => {
        console.log("err", err, err.response);
        setOpen(false);
        setModalError(true);
      });
  };
  function handleFileChange(e) {
    uploadcheque(e.target.files[0]);
  }
  const changeVisiblityStatus = () => {
    setIsUploadDone(false);
  };
  const handleCloseError = (event, reason) => {
    setModalError(false);
  };
  return (
    <div>
      {isuploaddone ? (
        <Decoded
          chequeResponse={chequeres}
          changeVisiblityStatus={changeVisiblityStatus}
        />
      ) : (
        <div className={classes.main}>
          <div className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <div className={classes.left}>
                  <h2>Routingnumbers, decoded</h2>
                  <p>
                    Don't worry. We didn't know how to read a cheque either.
                  </p>
                  <p>So we built this tool.</p>
                  <p>
                    Simply upload an image (or PDF) of a void cheque and we'll
                    extract the routing numbers for you.
                  </p>
                  <div className={classes.mobileUpload}>
                    <div className={classes.chooseFile}>
                      <input
                        accept="image/.jpeg,.png,.jpg"
                        ref={inputRef}
                        onChange={handleFileChange}
                        id="Upload"
                        type="file"
                        multiple
                        hidden
                        // onClick="showMessage()"
                      />
                      <label htmlFor="Upload">
                        <Button
                          size="large"
                          className={classes.chooseFileButton}
                          variant="contained"
                          component="span"
                        >
                          Upload Cheque Image
                        </Button>
                      </label>
                    </div>
                    <div className={classes.bottomText}>
                      <LockIcon style={{ color: "#FF4F63" }} />
                      <span>Your files are secure.</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <div>
                  <img width="100%" src={chequeImage} alt="chequeImage" />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes2.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes2.paper}>
              <h2 id="transition-modal-title">
                {" "}
                <CircularProgress color="inherit" />
              </h2>
              <h2 id="transition-modal-description">Uploading...</h2>
            </div>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes2.modal}
          open={modalError}
          onClose={handleCloseError}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 1000,
          }}
        >
          <Fade in={modalError}>
            <div className={classes2.paper}>
              <h2 id="transition-modal-title">
                <Alert severity="error">Could not get routing info</Alert>
              </h2>
              <h2 id="transition-modal-description">
                Please try again. Make sure the cheque is on a dark background!
              </h2>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
export default Routingnumber;
