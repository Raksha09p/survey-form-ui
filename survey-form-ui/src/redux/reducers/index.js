import { combineReducers } from "redux";
import { surveyFormsReducer } from "./surveyFormsReducer";
const reducers = combineReducers({
  allSurveyForms: surveyFormsReducer,
});
export default reducers;
