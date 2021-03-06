import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Authentication/Auth";
import { db } from "../../config";
import axios from "axios";
import classes from "./UploadCheque.module.css";
import Firebase from "firebase";
import { FiUpload } from "react-icons/fi";
import StepCard from "../Routingnumber/Components/StepCard";
import {
  Button,
  Snackbar,
  Backdrop,
  CircularProgress,
  Modal,
  Fade,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Alert from "@material-ui/lab/Alert";
import { DropzoneArea } from "material-ui-dropzone";
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
const UploadCheque = (props) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [chequeres, setChequeRes] = useState([]);
  const [opensuccess, setOpenSuccess] = useState(false);
  const [opensuccess2, setOpenSuccess2] = useState(false);
  const [isuploaddone, setIsUploadDone] = useState(false);
  const [fileName, setFileName] = useState();
  const [fileDate, setFileDate] = useState("");
  const { currentUser } = useContext(AuthContext);
  const classes2 = useStyles();
  var uid;
  if (currentUser !== null) {
    uid = currentUser.uid;
  }

  const saveChequeInfo = (data, fileName) => {
    const today = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    const dateString = monthNames[mm] + " " + dd + ", " + yyyy;
    setFileDate(dateString);
    const name = fileName;
    const accountNo = data.account_number;
    const institutionNo = data.institution_number;
    const transitNo = data.transit_number;
    const chequeObject = {
      uploadDate: dateString,
      name: name,
      accountNumber: accountNo,
      institutionNo: institutionNo,
      transitNumber: transitNo,
    };
    console.log(chequeObject);
    db.ref(`users/${uid}/chequeTable`)
      .push(chequeObject)
      .then((res) => {
        setIsUploadDone(true);
        setOpen(false);
      })
      .catch((err) => {
        console.log("erroris", err);

        setOpen(!open);
      });
  };
  const getUserData = () => {
    Firebase.database()
      .ref("users/" + uid)
      .once("value")
      .then((snapshot) => {});
  };
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
        saveChequeInfo(res.data, fileName);
      })
      .catch((err) => {
        console.log("err", err, err.response);
        setOpen(false);
        setModalError(true);
      });
  };
  useEffect(() => {
    setIsUploadDone(false);
    if (currentUser) {
      getUserData();
    }

    if (props.location.state !== undefined) {
      if (
        props.location.state.reason === "signup successfully" &&
        props.history.action === "REPLACE"
      ) {
        setOpenSuccess(true);
      } else if (props.location.state.reason === "redirect") {
        setOpenSuccess(false);
      }
    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess2(false);
  };
  const handleCloseError = (event, reason) => {
    setModalError(false);
  };
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  function handleChange(file) {
    if (file.length !== 0 && file[0] !== undefined) {
      setFileName(file[0].path);
      setOpenSuccess2(true);
      setOpenSuccess(false);
      uploadcheque(file[0]);
    }
  }
  function handleFileChange(e) {
    uploadcheque(e.target.files[0]);
  }
  const changeVisiblityStatus = () => {
    setIsUploadDone(false);
  };
  const handlePreviewIcon = (fileObject) => {
    // const fileName = (
    //   <h3 className={classes.fileNameH}>{fileObject.file.name}</h3>
    // );
    return null;
  };

  return (
    <div>
      {!isuploaddone ? (
        <div className={classes.main}>
          <h2>
            Upload an image of a <span>void</span> cheque.
          </h2>
          <p>Ensure the image is clear and taken on a dark surface.</p>
          <div className={classes.dropZone}>
            <DropzoneArea
              classes={{
                root: classes.dropZoneContainer,
                text: classes.textContainer,
                icon: classes.dropIcon,
              }}
              filesLimit={1}
              getPreviewIcon={handlePreviewIcon}
              showAlerts={false}
              Icon={FiUpload}
              dropzoneText="Drop image file here or"
              onChange={handleChange}
            />
          </div>
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
              />
              <label htmlFor="Upload">
                <Button
                  size="large"
                  className={classes.chooseFileButton}
                  variant="contained"
                  component="span"
                >
                  Choose file
                </Button>
              </label>
            </div>
            <div className={classes.bottomText}>
              <LockIcon style={{ color: "#FF4F63" }} />
              <span>Your files are secure.</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.decoded}>
          <Decoded
            chequeResponse={chequeres}
            changeVisiblityStatus={changeVisiblityStatus}
            fileDate={fileDate}
            fileName={fileName}
          />
        </div>
      )}
      <Snackbar
        open={opensuccess2}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleClose2}
      >
        <Alert onClose={handleClose2} severity="success">
          File {fileName} successfully added.
        </Alert>
      </Snackbar>
      <Snackbar
        open={opensuccess}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success">
          Sign up successful
        </Alert>
      </Snackbar>

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
                <Alert severity="error">
                  Unfortunately we couldn't read your cheque image. Please check
                  the possible reasons below and try again:
                </Alert>
              </h2>

              <ul className={classes.errorList}>
                <li>Image is not taken on a dark surface</li>
                <li>
                  Not a supported file type (we support jpg, png, and pdf files)
                </li>
                <li>
                  Not a supported cheque type (we only support Canadian cheques)
                </li>
                <li>Low-resolution image</li>
                <li>Image is not clear/blurry</li>
                <li>
                  There's some kind of obstruction (finger in front of numbers,
                  light glare, etc)
                </li>
              </ul>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className={classes.cardDiv}>
        <StepCard />
      </div>
    </div>
  );
};
export default UploadCheque;
