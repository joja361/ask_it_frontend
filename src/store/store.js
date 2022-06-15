import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { myQuestionReducer } from "./myQuestionsSlice";
import { questionReducer } from "./questionSlice";
import { questionsReducer } from "./questionsSlice";
import { responsesReducer } from "./responseSlice";
import { totaNulOfQuestionsReducer } from "./totalNumOfQuestions";

const combinedReducers = combineReducers({
  authStore: authReducer,
  questionsStore: questionsReducer,
  questionStore: questionReducer,
  totaNumOfQuestions: totaNulOfQuestionsReducer,
  myQuestionsStore: myQuestionReducer,
  responsesStore: responsesReducer,
});

//LOGOUT and delete all data in store
const rootReducer = (state, action) => {
  if (action.type === "authSlice/logout") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
