import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axios";

const initialState = {
  loading: false,
  questions: [],
  error: "",
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    fetchQuestionsBegin(state) {
      return { ...state, loading: true, error: "" };
    },
    fetchQuestionsSuccess(state, action) {
      return { ...state, loading: false, questions: action.payload };
    },
    fetchQuestionsFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: questionReducer, actions } = questionsSlice;

export const {
  fetchQuestionsBegin,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} = actions;

export const questionsData = (store) => store.questionsStore;

export const getQuestions = () => async (dispatch) => {
  dispatch(fetchQuestionsBegin());
  try {
    const { data } = await mainUrl("/questions?last=20"); // we need parameter for pages or questions to be listed so we can have load more question option
    return dispatch(fetchQuestionsSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(fetchQuestionsFailure());
  }
};
