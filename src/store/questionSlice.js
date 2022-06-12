import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  question: {},
  error: "",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    fetchQuestionBegin(state) {
      return { ...state, loading: true, error: "" };
    },
    fetchQuestionSuccess(state, action) {
      return { ...state, loading: false, question: action.payload };
    },
    fetchQuestionFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: questionReducer, actions } = questionSlice;

export const {
  fetchQuestionBegin,
  fetchQuestionSuccess,
  fetchQuestionFailure,
} = actions;

export const questionData = (store) => store.questionStore;

export const getQuestion = (questionId) => async (dispatch) => {
  dispatch(fetchQuestionBegin());
  try {
    const { data } = await mainUrl(`/questions/${questionId}`);
    return dispatch(fetchQuestionSuccess(data[0]));
  } catch (err) {
    console.log(err);
    dispatch(fetchQuestionFailure());
  }
};
