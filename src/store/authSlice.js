import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axios";
import {
  deleteTokenAndUser,
  getTokenAndUser,
  saveTokenAndUser,
} from "../utils/token";

const { token, email } = getTokenAndUser();
let isAuth = Boolean(token);

const initialState = {
  loading: false,
  user: { email },
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
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: { ...action.payload },
      };
    },
    logout(state) {
      deleteTokenAndUser();
      return { ...state, loading: false, isAuthenticated: false };
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

export const { setLoading, setError, signup, login, logout } = actions;

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

export const loginUser = (loginEmail, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await mainUrl.post("/auth/login", {
      email: loginEmail,
      password,
    });
    const { userId, token, email, name } = data;
    saveTokenAndUser(token, email);
    dispatch(login({ email, name }));
    return Promise.resolve();
  } catch (err) {
    dispatch(
      setError({
        error: {
          login: err.response.data.message,
        },
      })
    );
    return Promise.reject();
  }
};
