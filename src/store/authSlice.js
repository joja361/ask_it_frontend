import { createSlice } from "@reduxjs/toolkit";
import { mainUrl } from "../utils/axiosInstances";
import { deleteUserData, getUserData, saveUserData } from "../utils/token";

const { token, email, userId } = getUserData();
let isAuth = Boolean(token);

const initialState = {
  loading: false,
  user: { email, userId },
  error: {},
  isAuthenticated: isAuth,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLoading(state) {
      return {
        ...state,
        loading: true,
        error: {},
      };
    },
    signup(state) {
      return { ...state, loading: false, error: { signup: "" } };
    },
    login(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: { ...action.payload },
      };
    },
    logout(state, action) {
      deleteUserData();
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
    } catch (error) {
      dispatch(
        setError({
          error: {
            signup: error.response.data.message,
          },
        })
      );
    }
  };

export const loginUser = (loginEmail, password) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await mainUrl.post("/auth/login", {
      email: loginEmail,
      password,
    });
    const { userId, token, email, name } = data;
    saveUserData(token, email, userId);
    dispatch(login({ email, name, userId }));
  } catch (error) {
    dispatch(
      setError({
        error: {
          login: error.response?.data.message,
        },
      })
    );
  }
};

export const resetPassword =
  (userId, oldPassword, newPassword) => async (dispatch) => {
    dispatch(setLoading());
    try {
      await mainUrl.put("/auth/reset-password", {
        userId,
        oldPassword,
        newPassword,
      });
    } catch (error) {
      console.log(error);
      dispatch(
        setError({
          resetPasswordError: error.response?.data.message,
        })
      );
    }
  };
