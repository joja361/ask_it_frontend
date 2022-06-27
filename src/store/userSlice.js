import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  hotQuestions: [],
  user: {},
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchUserSuccess(state, action) {
      const { userDetails, hotQuestions } = action.payload;
      return {
        ...state,
        loading: false,
        user: userDetails,
        hotQuestions: hotQuestions,
      };
    },
    fetchUserFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: userReducer, actions } = userSlice;

export const { fetchUserBegin, fetchUserSuccess, fetchUserFailure } = actions;

export const usersData = (store) => store.userStore;

export const getUser = (userId) => async (dispatch) => {
  dispatch(fetchUserBegin());
  try {
    const userDetailsUrl = mainUrl(`/user/${userId}`);
    const hotQuestionsUrl = mainUrl(`/user/${userId}/hotQuestions`);

    const getUserDetailsAndHotQuestions = await Promise.all([
      userDetailsUrl,
      hotQuestionsUrl,
    ]);

    const [{ data: user }, { data: hotQuestions }] =
      getUserDetailsAndHotQuestions;
    const userDetails = user[0];

    dispatch(fetchUserSuccess({ userDetails, hotQuestions }));
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(fetchUserFailure(status, message));
  }
};
