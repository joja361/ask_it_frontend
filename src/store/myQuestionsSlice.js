import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  myQuestions: [],
  likes: [],
  error: {},
};

const myQuestionsSlice = createSlice({
  name: "myQuestions",
  initialState,
  reducers: {
    fetchMyQuestionsBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchMyQuestionsSuccess(state, action) {
      const { myQuestions, likes, numOfMyQuestions } = action.payload;
      const myQuestionsData = numOfMyQuestions
        ? [...state.myQuestions, ...myQuestions]
        : myQuestions;

      const likesData = numOfMyQuestions ? [...state.likes, ...likes] : likes;

      return {
        ...state,
        loading: false,
        myQuestions: myQuestionsData,
        likes: likesData,
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

export const getMyQuestionsAndLikes =
  (userId, numOfMyQuestions) => async (dispatch) => {
    dispatch(fetchMyQuestionsBegin());
    try {
      let more;
      numOfMyQuestions !== 0
        ? (more = `?moreQuestions=${numOfMyQuestions}`)
        : (more = ``);
      const listOfMyQuestions = mainUrl(`/user/${userId}/questions${more}`);
      const listOfLikes = mainUrl(`/user/${userId}/getLikesAndDislikes`);
      const myQuestionsAndLikes = await Promise.all([
        listOfMyQuestions,
        listOfLikes,
      ]);
      const [{ data: myQuestions }, { data: likes }] = myQuestionsAndLikes;
      dispatch(
        fetchMyQuestionsSuccess({ myQuestions, likes, numOfMyQuestions })
      );
    } catch (error) {
      const { data, status } = error.response;
      const { message } = data;
      dispatch(fetchMyQuestionsFailure({ status, message }));
    }
  };
