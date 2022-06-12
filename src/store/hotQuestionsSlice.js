import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hotQuestions: [],
  error: "",
};

const hotQuestionsSlice = createSlice({
  name: "hotQuestions",
  initialState,
  reducers: {
    fetchHotQuestionsBegin(state) {
      return { ...state, loading: true };
    },
    fetchHotQuestionsSuccess(state, action) {
      return { ...state, loading: false, hotQuestions: action.payload };
    },
    fetchHotQuestionsFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { actions, reducer: hotQuestionsReducer } = hotQuestionsSlice;

export const {
  fetchHotQuestionsBegin,
  fetchHotQuestionsSuccess,
  fetchHotQuestionsFailure,
} = actions;

export const hotQuestionsData = (store) => store.hotQuestionsReducer;

//First we need to enable like option
