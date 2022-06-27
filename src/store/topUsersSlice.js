import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  topUsers: [],
  error: {},
};

const topUsersSlice = createSlice({
  name: "topUsers",
  initialState,
  reducers: {
    fetchTopUsersBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchTopUsersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        topUsers: action.payload,
      };
    },
    fetchTopUsersFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const { reducer: topUsersReducer, actions } = topUsersSlice;

export const {
  fetchTopUsersBegin,
  fetchTopUsersSuccess,
  fetchTopUsersFailure,
} = actions;

export const topUsersData = (store) => store.topUsersStore;

export const getTopUsers = () => async (dispatch) => {
  dispatch(fetchTopUsersBegin());
  try {
    const { data: topUsers } = await mainUrl(`/user/usersWithMostResponses`);
    dispatch(fetchTopUsersSuccess(topUsers));
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(fetchTopUsersFailure({ status, message }));
  }
};
