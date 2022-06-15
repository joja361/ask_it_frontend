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
      const { data, numOfMyQuestions } = action.payload;
      const myQuestionsData = numOfMyQuestions
        ? [...state.myQuestions, ...data]
        : data;
      return {
        ...state,
        loading: false,
        myQuestions: myQuestionsData,
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

export const getMyQuestions =
  (userId, numOfMyQuestions) => async (dispatch) => {
    dispatch(fetchMyQuestionsBegin());
    try {
      let more;
      numOfMyQuestions !== 0
        ? (more = `&moreQuestions=${numOfMyQuestions}`)
        : (more = ``);
      const { data } = await mainUrl(`/user/${userId}?tab=myQuestions${more}`);
      return dispatch(fetchMyQuestionsSuccess({ data, numOfMyQuestions }));
    } catch (err) {
      console.log(err);
      dispatch(fetchMyQuestionsFailure());
    }
  };
