import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { questionsReducer } from "./questionsSlice";
import { myQuestionReducer } from "./myQuestionsSlice";
import { questionReducer } from "./questionSlice";

const store = configureStore({
  reducer: {
    authStore: authReducer,
    questionsStore: questionsReducer,
    questionStore: questionReducer,
    myQuestionsStore: myQuestionReducer,
  },
});

export default store;
