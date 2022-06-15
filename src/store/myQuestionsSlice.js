import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

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
      return {
        ...state,
        loading: false,
        myQuestions: [...state.myQuestions, ...action.payload],
      };
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

export const getMyQuestions = (userId, numOfQuestions) => async (dispatch) => {
  dispatch(fetchMyQuestionsBegin());
  try {
    const { data } = await mainUrl(
      `/user/${userId}?last=${numOfQuestions}&tab=myQuestions`
    );
    return dispatch(fetchMyQuestionsSuccess(data));
  } catch (err) {
    console.log(err);
    dispatch(fetchMyQuestionsFailure());
  }
};
