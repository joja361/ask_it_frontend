import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axios";

const initialState = {
  loading: false,
  myQuestions: [],
  error: "",
};

const myQuestionsSlice = createSlice({
  name: "myQuestions",
  initialState,
  reducers: {
    fetchMyQuestionsBegin(state) {
      return { ...state, loading: true, error: "" };
    },
    fetchMyQuestionsSuccess(state, action) {
      return { ...state, loading: false, myQuestions: action.payload };
    },
    fetchMyQuestionsFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: myQuestionReducer, actions } = myQuestionsSlice;

export const {
  fetchMyQuestionsBegin,
  fetchMyQuestionsSuccess,
  fetchMyQuestionsFailure,
} = actions;

export const myQuestionsData = (store) => store.myQuestionsStore;

export const getMyQuestions = (userId) => async (dispatch) => {
  dispatch(fetchMyQuestionsBegin());
  try {
    const { data } = await mainUrl(`/questions/${userId}?last=20`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }); // we need parameter for pages or questions to be listed so we can have load more question option
    console.log(data);
    return dispatch(fetchMyQuestionsSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(fetchMyQuestionsFailure());
  }
};
