import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  questions: [],
  likes: [],
  error: {},
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    fetchQuestionsBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchQuestionsSuccess(state, action) {
      const { questions, likes, numOfQuestions } = action.payload;
      const questionsData = numOfQuestions
        ? [...state.questions, ...questions]
        : questions;
      const likesData = numOfQuestions ? [...state.likes, ...likes] : likes;
      return {
        ...state,
        loading: false,
        questions: questionsData,
        likes: likesData,
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

export const getQuestionsAndLikes = (numOfQuestions) => async (dispatch) => {
  dispatch(fetchQuestionsBegin());
  try {
    let more;
    numOfQuestions !== 0
      ? (more = `?moreQuestions=${numOfQuestions}`)
      : (more = ``);
    const listOfQuestions = mainUrl(`/questions${more}`);
    const listOfLikes = mainUrl(`/questions/getLikesAndDislikes${more}`);
    const questionsAndLikes = await Promise.all([listOfQuestions, listOfLikes]);
    const [{ data: questions }, { data: likes }] = questionsAndLikes;

    dispatch(fetchQuestionsSuccess({ questions, likes, numOfQuestions }));
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(fetchQuestionsFailure({ status, message }));
  }
};
