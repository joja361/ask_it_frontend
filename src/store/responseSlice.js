import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  loadingOnCreate: false,
  responses: [],
  likes: [],
  error: {},
};

const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    fetchResponsesBegin(state) {
      return { ...state, loading: true, error: {} };
    },
    fetchResponsesSuccess(state, action) {
      const { responses, likes } = action.payload;
      return { ...state, loading: false, responses: responses, likes: likes };
    },
    fetchResponsesFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    createResponseBegin(state) {
      return { ...state, loadingOnCreate: true, error: {} };
    },
    createResponseSuccess(state, action) {
      console.log(action.payload);
      return {
        ...state,
        loadingOnCreate: false,
        responses: [...state.responses, action.payload],
      };
    },
    createResponseFailure(state, action) {
      return { ...state, loadingOnCreate: false, error: action.payload };
    },
  },
});

export const { actions, reducer: responsesReducer } = responseSlice;

export const {
  fetchResponsesBegin,
  fetchResponsesSuccess,
  fetchResponsesFailure,
  createResponseBegin,
  createResponseSuccess,
  createResponseFailure,
} = actions;

export const responseData = (store) => store.responsesStore;

export const getResponsesAndLikes = (questionId) => async (dispatch) => {
  dispatch(fetchResponsesBegin());
  try {
    const { data: responses } = await mainUrl(
      `/questions/${questionId}/responses`
    );
    const { data: likes } = await mainUrl(
      `/questions/${questionId}/responses/likes`
    );
    dispatch(fetchResponsesSuccess({ responses, likes }));
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(fetchResponsesFailure({ status, message }));
  }
};

export const createResponse = (questionId, response) => async (dispatch) => {
  dispatch(createResponseBegin());
  try {
    const { data: responseId, status } = await mainUrl.post(
      `/questions/${questionId}`,
      {
        response,
      }
    );
    if (status === 200) {
      const { data: response } = await mainUrl(
        `/questions/${questionId}/responses/${responseId}`
      );

      dispatch(createResponseSuccess(response[0]));
    }
  } catch (error) {
    const { data, status } = error.response;
    const { message } = data;
    dispatch(createResponseFailure({ status, message }));
  }
};
