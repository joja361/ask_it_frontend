import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loadingTotalQuestions: false,
  totalQuestions: 0,
  errorTotalQuestions: "",
};

const totaNulOfQuestions = createSlice({
  name: "totalNumOfQuestions",
  initialState,
  reducers: {
    fetchTotalNumOfQuestionsBegin(state, action) {
      return { ...state, loadingTotalQuestions: true, errorTotalQuestions: "" };
    },
    fetchTotalNumOfQuestionsSuccess(state, action) {
      return {
        ...state,
        totalQuestions: action.payload,
        loadingTotalQuestions: false,
      };
    },
    fetchTotalNumOfQuestionsFailure(state, action) {
      return {
        ...state,
        loadingTotalQuestions: false,
        errorTotalQuestions: action.payload,
      };
    },
  },
});

export const { reducer: totaNulOfQuestionsReducer, actions } =
  totaNulOfQuestions;

export const {
  fetchTotalNumOfQuestionsBegin,
  fetchTotalNumOfQuestionsSuccess,
  fetchTotalNumOfQuestionsFailure,
} = actions;

export const totaNulOfQuestionsData = (store) => store.totaNumOfQuestions;

export const getTotalNumOfQuestions = (userId) => async (dispatch) => {
  const fetchMyQuestionOrAll = userId
    ? `/user/${userId}/totalQuestions`
    : `/questions/totalQuestions`;

  dispatch(fetchTotalNumOfQuestionsBegin());

  try {
    const { data } = await mainUrl(fetchMyQuestionOrAll);
    const { totalNumOfQuestions, totalNumOfMyQuestions } = data;
    dispatch(
      fetchTotalNumOfQuestionsSuccess(
        totalNumOfQuestions || totalNumOfMyQuestions
      )
    );
  } catch (error) {
    console.log(error);
    dispatch(fetchTotalNumOfQuestionsFailure());
  }
};
