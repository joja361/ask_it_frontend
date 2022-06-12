import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  myQuestions: [],
  error: "",
  totalQuestions: 0,
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
    fetchTotalNumOfMyQuestions(state, action) {
      return { ...state, totalQuestions: action.payload };
    },
  },
});

export const { reducer: myQuestionReducer, actions } = myQuestionsSlice;

export const {
  fetchMyQuestionsBegin,
  fetchMyQuestionsSuccess,
  fetchMyQuestionsFailure,
  fetchTotalNumOfMyQuestions,
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

export const getTotalNumOfQuesions = (userId) => async (dispatch) => {
  try {
    const { data } = await mainUrl(`/user/${userId}/totalQuestions`);
    const { totalNumOfQuestions } = data;
    dispatch(fetchTotalNumOfMyQuestions(totalNumOfQuestions));
  } catch (error) {
    console.log(error);
  }
};
