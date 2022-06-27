import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { hotQuestionsReducer } from "./hotQuestionsSlice";
import { myQuestionReducer } from "./myQuestionsSlice";
import { questionReducer } from "./questionSlice";
import { questionsReducer } from "./questionsSlice";
import { responsesReducer } from "./responseSlice";
import { topUsersReducer } from "./topUsersSlice";
import { totaNumOfQuestionsReducer } from "./totalNumOfQuestions";
import { userReducer } from "./userSlice";

const combinedReducers = combineReducers({
  authStore: authReducer,
  userStore: userReducer,
  topUsersStore: topUsersReducer,
  questionsStore: questionsReducer,
  questionStore: questionReducer,
  hotQuestionStore: hotQuestionsReducer,
  myQuestionsStore: myQuestionReducer,
  totaNumOfQuestions: totaNumOfQuestionsReducer,
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
