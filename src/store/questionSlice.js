import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  question: {},
  likes: [],
  error: {},
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    fetchQuestionBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchQuestionSuccess(state, action) {
      const { question, likes } = action.payload;
      return { ...state, loading: false, question: question, likes: likes };
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

export const getQuestionAndLikes = (questionId) => async (dispatch) => {
  dispatch(fetchQuestionBegin());
  try {
    const questionDetail = mainUrl(`/questions/${questionId}`);
    const questionLikes = mainUrl(`/questions/${questionId}/likes`);
    const questionAndLikes = await Promise.all([questionDetail, questionLikes]);
    const [{ data: question }, { data: likes }] = questionAndLikes;

    return dispatch(fetchQuestionSuccess({ question, likes }));
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(fetchQuestionFailure({ status, message }));
  }
};
