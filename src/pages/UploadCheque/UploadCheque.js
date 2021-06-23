import React, { useState, useRef } from "react";
import Navbar from "../Common/Navbar/Navbar";
import classes from "./UploadCheque.module.css";
import { FiUpload } from "react-icons/fi";
import Button from "@material-ui/core/Button";
import LockIcon from "@material-ui/icons/Lock";
import { DropzoneArea } from "material-ui-dropzone";

const UploadCheque = () => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [cropper, setCropper] = useState(false);
  function handleChange(files) {
    setFiles(files);
  }
  function handleFileChange(e) {
    window.URL = window.URL || window.webkitURL;
    let url = window.URL.createObjectURL(e.target.files[0]);
    inputRef.current.value = "";
    setCropper(true);
  }
  const bt = (
    <Button
      size="large"
      className={classes.chooseFileButton}
      variant="contained"
      component="span"
    >
      Choose file
    </Button>
  );
  return (
    <div>
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
            Icon={FiUpload}
            dropzoneText="Drop image file here or"
            onChange={handleChange}
          />
        </div>
        <div className={classes.mobileUpload}>
          <div className={classes.chooseFile}>
            <input
              accept="image/.jpeg,.png"
              ref={inputRef}
              onChange={handleFileChange}
              id="Upload"
              type="file"
              multiple
              hidden
              onClick="showMessage()"
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
    </div>
  );
};
export default UploadCheque;
