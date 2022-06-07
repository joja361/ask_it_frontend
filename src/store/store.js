import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { questionReducer } from "./questionsSlice";

const store = configureStore({
  reducer: {
    authStore: authReducer,
    questionsStore: questionReducer,
  },
});

export default store;
