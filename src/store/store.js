import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { questionReducer } from "./questionsSlice";
import { myQuestionReducer } from "./myQuestionsSlice";

const store = configureStore({
  reducer: {
    authStore: authReducer,
    questionsStore: questionReducer,
    myQuestionsStore: myQuestionReducer,
  },
});

export default store;
