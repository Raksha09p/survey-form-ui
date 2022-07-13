import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setSurveyForms,
  setSurveyName,
} from "../redux/actions/surveyFormsActions";
import { fetchSurveyForms } from "../redux/actions/surveyFormsActions";
import { Box, TextField, Button } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import "../App.css";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";


const SurveyFormPage = () => {
  const surveyForms = useSelector((state) => state.allSurveyForms.surveyForms);
  const surveyName = useSelector((state) => state.allSurveyForms.surveyName);
  const dispatch = useDispatch();

  const fetchSurveyForms = async () => {
    const response = await axios
      .get("http://localhost:8080/surveyForm")
      .catch((err) => {
        console.log("Err: ", err);
      });
    console.log(response.data);
    dispatch(setSurveyName(response.data));
    dispatch(setSurveyForms(response.data));
  };
  
  useEffect(() => {
    fetchSurveyForms();
  }, []);

  useEffect(() => {
    console.log("surveyName", surveyName);
    console.log("surveyForm", surveyForms);
  }, [surveyForms, surveyName]);

  /*dark mode*/
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  /*creating arr to map over the fields*/
  const arr = [];
  for (var key in surveyForms) {
    if (surveyForms.hasOwnProperty(key)) {
      arr.push({ [key]: surveyForms[key] });
    }
  }

  /*sorting arr to get the fields in order*/
  arr.sort((a, b) => {
    return Object.values(a)[0].sortOrder - Object.values(b)[0].sortOrder;
  });

  /*creating data to store the form data*/
  const data = {};
  data["formName"] = surveyName;

  const formData = {};
  const [val, setVal] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*storing the value of fields in data object*/
    data["userId"] = event.target[0].value;

    for (var i = 0; i < arr.length; i++) {

      formData[Object.keys(arr[i])] = event.target[2 * i].value;
    }
    data["formdata"] = JSON.stringify(formData);
    
    console.log("form data", data);

    var finalData = JSON.stringify(data);

    /*sending the response to api*/
    try {
      handleOpenLoader();
      let res = await fetch("http://localhost:8080/formData", {
        method: "POST",
        body: finalData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      document.getElementById("form").reset();

      var statusText;
      res.headers.forEach(function (value, name) {
        console.log(name + ": " + value);
        if (name === "message") {
          statusText = value;
        }
      });
      if (res.status === 200) {
        setMessage("Form Submitted successfully");
        handleCloseLoader();
        handleOpenSuccess();
      } else {
        setMessage(statusText);
        handleCloseLoader();
        handleOpenError();
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  };


  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleOpenSuccess = () => setOpenSuccess(true);
  const handleCloseSuccess = () => setOpenSuccess(false);

  const [openError, setOpenError] = React.useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const [openLoader, setOpenLoader] = React.useState(false);
  const handleOpenLoader = () => setOpenLoader(true);
  const handleCloseLoader = () => setOpenLoader(false);

  return (
    <div>
      <div className="nav">
        <AppBar position="static">
          <Typography variant="h4" className="nav-bar">
            {surveyName}
          </Typography>
        </AppBar>
      </div>
      <div className="switch-toggle">
        <div className="button-check" id="button-check">
          <input
            type="checkbox"
            onClick={myFunction}
            className="checkbox"
          ></input>
          <span className="switch-btn"></span>
          <span className="layer"></span>
        </div>
      </div>

      <form className="form-container" id="form" onSubmit={handleSubmit}>
        {arr.map((item, index) => (
          <Box key={index}>
            <TextField
              inputProps={{
                maxLength: Object.values(item)[0].maxLength,
                pattern: Object.values(item)[0].pattern,
              }}
              fullWidth
              required={Object.values(item)[0].required}
              placeholder={Object.values(item)[0].description}
              label={Object.values(item)[0].displayName}
              margin="normal"
              variant="outlined"
              onChange={(event) => setVal(event.target.value)}
            />
          </Box>
        ))}

        <Button type="submit" className="button">
          <div className="button-text">Submit</div>
        </Button>
      </form>

      <Modal open={openLoader} onClose={handleCloseLoader}>
        <Box className="modalLoader">
          <CircularProgress />
        </Box>
      </Modal>

      <Modal open={openSuccess} onClose={handleCloseSuccess}>
        <Box className="modal-success">
          <p className="message">
            {message}
            <CloseIcon
              sx={{ color: "white", paddingLeft: 2 }}
              onClick={handleCloseSuccess}
            />
          </p>
        </Box>
      </Modal>

      <Modal open={openError} onClose={handleCloseError}>
        <Box className="modal-error">
          <p className="message">
            {message}
            <CloseIcon
              sx={{ color: "white", paddingLeft: 2 }}
              onClick={handleCloseError}
            />
          </p>
        </Box>
      </Modal>
    </div>
  );
};
export default SurveyFormPage;
