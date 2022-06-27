import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadMoreButton from "../components/Buttons/LoadMoreButton";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import HeaderOfQuestionList from "../components/Questions/HeaderOfQuestionList";
import QuestionList from "../components/Questions/QuestionList";
import { authData } from "../store/authSlice";
import {
  getMyQuestionsAndLikes,
  myQuestionsData,
} from "../store/myQuestionsSlice";
import ErrorPage from "./ErrorPage";

export default function MyQuestions() {
  const dispatch = useDispatch();
  const { loading, myQuestions, likes, error } = useSelector(myQuestionsData);
  const { user } = useSelector(authData);
  const { userId } = user;
  const [numOfMyQuestions, setNumOfMyQuestions] = useState(0);

  useEffect(() => {
    dispatch(getMyQuestionsAndLikes(userId, numOfMyQuestions));
  }, [dispatch, numOfMyQuestions, userId]);

  if (error.message) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <>
      <NavBar />
      <Container className="mx-auto wrapper">
        <HeaderOfQuestionList myQuestions={true} />
        <QuestionList questions={myQuestions} likes={likes} />
        {loading && <Loading height={661} />}
        <LoadMoreButton
          loading={loading}
          loadMore={setNumOfMyQuestions}
          numOfQuestions={numOfMyQuestions}
        />
      </Container>
    </>
  );
}
