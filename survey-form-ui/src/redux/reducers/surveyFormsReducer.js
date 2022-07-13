import { ActionTypes } from "../constants/action-types";
const intialState = {
  surveyForms: [],
  surveyName: "",
};

export const surveyFormsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SURVEYFORMS:
      return {
        ...state,
        surveyForms:
          payload._embedded.surveyFormList[2].serviceSchema.properties,
      };
    case ActionTypes.SET_SURVEYNAME:
      return {
        ...state,
        surveyName:
          payload._embedded.surveyFormList[2].contractMetaData.displayName,
      };
    default:
      return state;
  }
};
