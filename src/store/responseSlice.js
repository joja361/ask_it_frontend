import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";

const initialState = {
  loading: false,
  responses: [],
  error: "",
};

const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {
    fetchResponsesBegin(state) {
      return { ...state, loading: true, error: "" };
    },
    fetchResponsesSuccess(state, action) {
      return { ...state, loading: false, responses: action.payload };
    },
    fetchResponsesFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
    },
    createResponseBegin(state) {
      return { ...state, loading: true, error: "" };
    },
    createResponseSuccess(state, action) {
      return { ...state };
    },
    createResponseFailure(state, action) {
      return { ...state, loading: false, error: action.payload };
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

export const getResponses = (questionId) => async (dispatch) => {
  dispatch(fetchResponsesBegin());
  try {
    const { data } = await mainUrl(`/questions/${questionId}/responses`);
    dispatch(fetchResponsesSuccess(data));
    console.log(data);
  } catch (error) {
    console.log(error);
    // TODO: error handeling
  }
};

export const createResponse = (questionId, response) => async (dispatch) => {
  dispatch(createResponseBegin());
  try {
    const { status } = await mainUrl.post(`/questions/${questionId}`, {
      response,
    });
    if (status === 200) {
      //CHECK THIS UX
      dispatch(createResponseSuccess());
      dispatch(getResponses(questionId));
    }
  } catch (error) {
    console.log(error);
    // TODO: error handeling
  }
};
