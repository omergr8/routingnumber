import React, { useState, useRef } from "react";
import axios from "axios";
import classes from "./Routingnumber.module.css";
import { Grid, Button } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import chequeImage from "../../Assets/test.JPG";
import Decoded from "../Decoded/Decoded";
const Routingnumber = () => {
  const inputRef = useRef(null);
  const [cropper, setCropper] = useState(false);
  const [chequeres, setChequeRes] = useState([]);
  const [isuploaddone, setIsUploadDone] = useState(false);
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

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post(url, data, config)
      .then((res) => {
        setChequeRes(res.data);
        setIsUploadDone(true);
      })
      .catch((err) => {
        console.log("err", err, err.response);
      });
  };
  function handleFileChange(e) {
    uploadcheque(e.target.files[0]);
  }
  const changeVisiblityStatus = () => {
    setIsUploadDone(false);
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
    </div>
  );
};
export default Routingnumber;
