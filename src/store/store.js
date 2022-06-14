import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { myQuestionReducer } from "./myQuestionsSlice";
import { questionReducer } from "./questionSlice";
import { questionsReducer } from "./questionsSlice";
import { responsesReducer } from "./responseSlice";

const combinedReducers = combineReducers({
  authStore: authReducer,
  questionsStore: questionsReducer,
  questionStore: questionReducer,
  myQuestionsStore: myQuestionReducer,
  responsesStore: responsesReducer,
});

//LOGOUT and delete all data in store
const rootReducer = (state, action) => {
  if (action.type === "authSlice/logout") {
    state = undefined;
  }
  if (action.type === "authSlice/login") {
    state.questionsStore = {
      loading: false,
      questions: [],
      error: "",
    };
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
