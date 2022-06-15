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
      const { data, numOfQuestions } = action.payload;
      const questionsData = numOfQuestions
        ? [...state.questions, ...data]
        : data;
      return {
        ...state,
        loading: false,
        questions: questionsData,
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
    let more;
    numOfQuestions !== 0
      ? (more = `?moreQuestions=${numOfQuestions}`)
      : (more = ``);
    const { data } = await mainUrl(`/questions${more}`);
    dispatch(fetchQuestionsSuccess({ data, numOfQuestions }));
  } catch (err) {
    console.log(err);
    dispatch(fetchQuestionsFailure());
  }
};
