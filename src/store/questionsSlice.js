import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

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
      return {
        ...state,
        loading: false,
        questions: [...state.questions, ...action.payload],
      };
    },
    fetchQuestionsFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: questionsReducer, actions } = questionsSlice;

export const {
  fetchQuestionsBegin,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
} = actions;

export const questionsData = (store) => store.questionsStore;

export const getQuestions = (numOfQuestions) => async (dispatch) => {
  dispatch(fetchQuestionsBegin());
  try {
    const { data } = await mainUrl(`/questions?last=${numOfQuestions}`);
    return dispatch(fetchQuestionsSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(fetchQuestionsFailure());
  }
};
