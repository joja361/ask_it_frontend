import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  hotQuestions: [],
  likes: [],
  error: {},
};

const hotQuestionsSlice = createSlice({
  name: "hotQuestions",
  initialState,
  reducers: {
    fetchHotQuestionsBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchHotQuestionsSuccess(state, action) {
      const { hotQuestions, likes } = action.payload;
      return {
        ...state,
        loading: false,
        hotQuestions: hotQuestions,
        likes: likes,
      };
    },
    fetchHotQuestionsFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: hotQuestionsReducer, actions } = hotQuestionsSlice;

export const {
  fetchHotQuestionsBegin,
  fetchHotQuestionsSuccess,
  fetchHotQuestionsFailure,
} = actions;

export const hotQuestionsData = (store) => store.hotQuestionStore;

export const getHotQuestionsAndLikes = () => async (dispatch) => {
  dispatch(fetchHotQuestionsBegin());
  try {
    const listOfhotQuestions = mainUrl(`/questions/hotQuestions`);
    const listOfLikes = mainUrl(`/questions/hotQuestions/likes`);
    const hotQuestionsAndLikes = await Promise.all([
      listOfhotQuestions,
      listOfLikes,
    ]);
    const [{ data: hotQuestions }, { data: likes }] = hotQuestionsAndLikes;

    dispatch(fetchHotQuestionsSuccess({ hotQuestions, likes }));
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(fetchHotQuestionsFailure({ status, message }));
  }
};
