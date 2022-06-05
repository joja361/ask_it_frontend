import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axios";

//check for this what to do with it
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
    setLoading(state, action) {
      return { ...state, ...action.payload };
    },
    signup(state, action) {
      return { ...state, ...action.payload };
    },
    setError(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer: authReducer } = authSlice;

export const { setLoading, setError, signup } = actions;

export const authData = (store) => store.authStore;

export const signupUser =
  (email, password, confirmPassword, name) => async (dispatch) => {
    try {
      dispatch(
        setLoading({
          loading: true,
          error: { signup: "" },
        })
      );
      await mainUrl.post("/auth/signup", {
        email,
        password,
        confirmPassword,
        name,
      });
    } catch (err) {
      dispatch(
        setError({
          loading: false,
          error: {
            signup: err.response.data.message,
            isAuthenticated: false,
          },
        })
      );
    }
  };
