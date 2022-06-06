import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axios";

let isAuth = Boolean(localStorage.getItem("authUser"));

const initialState = {
  loading: false,
  user: null,
  error: {
    login: "",
    signup: "",
  },
  isAuthenticated: isAuth,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLoading(state) {
      return { ...state, loading: true };
    },
    signup(state) {
      return { ...state, loading: false };
    },
    login(state, action) {
      return { ...state };
    },
    setError(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        ...action.payload,
      };
    },
  },
});

export const { actions, reducer: authReducer } = authSlice;

export const { setLoading, setError, signup, login } = actions;

export const authData = (store) => store.authStore;

export const signupUser =
  (email, password, confirmPassword, name) => async (dispatch) => {
    try {
      dispatch(setLoading());
      await mainUrl.post("/auth/signup", {
        email,
        password,
        confirmPassword,
        name,
      });
      dispatch(signup());
      return Promise.resolve();
    } catch (err) {
      dispatch(
        setError({
          error: {
            signup: err.response.data.message,
          },
        })
      );
      return Promise.reject();
    }
  };
