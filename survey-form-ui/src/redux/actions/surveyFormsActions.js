import { ActionTypes } from "../constants/action-types";
// import axios from "axios";
export const setSurveyForms = (surveyForms) => {
  return {
    type: ActionTypes.SET_SURVEYFORMS,
    payload: surveyForms,
  };
};
export const setSurveyName = (surveyName) => {
  return {
    type: ActionTypes.SET_SURVEYNAME,
    payload: surveyName,
  };
};

// export const fetchSurveyForms = async () => {
//   return (dispatch) => { const response =await axios
//     .get("http://localhost:8080/surveyForm")
//     .catch((err) => {
//       console.log("Err: ", err);
//     });
//   console.log(response.data);
//   dispatch(setSurveyName(response.data));
//   dispatch(setSurveyForms(response.data));
// }};