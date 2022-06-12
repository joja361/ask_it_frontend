import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { hotQuestionsReducer } from "./hotQuestionsSlice";
import { myQuestionReducer } from "./myQuestionsSlice";
import { questionReducer } from "./questionSlice";
import { questionsReducer } from "./questionsSlice";
import { responsesReducer } from "./responseSlice";

const store = configureStore({
  reducer: {
    authStore: authReducer,
    questionsStore: questionsReducer,
    questionStore: questionReducer,
    myQuestionsStore: myQuestionReducer,
    responsesStore: responsesReducer,
    // hotQuestionsStore: hotQuestionsReducer,
  },
});

export default store;
