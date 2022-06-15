import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import LoadMoreButton from "../components/Buttons/LoadMoreButton";
import NavBar from "../components/NavBar";
import HeaderOfQuestionList from "../components/Questions/HeaderOfQuestionList";
import QuestionList from "../components/Questions/QuestionList";
import { authData } from "../store/authSlice";
import { getMyQuestions, myQuestionsData } from "../store/myQuestionsSlice";

export default function MyQuestions() {
  const dispatch = useDispatch();
  const { loading, myQuestions, error } = useSelector(myQuestionsData);
  const { user } = useSelector(authData);
  const { userId } = user;
  const [numOfMyQuestions, setNumOfMyQuestions] = useState(0);

  console.log(numOfMyQuestions);

  useEffect(() => {
    dispatch(getMyQuestions(userId, numOfMyQuestions));
  }, [dispatch, numOfMyQuestions, userId]);

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        <HeaderOfQuestionList myQuestions={true} />
        <QuestionList questions={myQuestions} />
        {loading && <Loading />}
        <LoadMoreButton
          loading={loading}
          loadMore={setNumOfMyQuestions}
          numOfQuestions={numOfMyQuestions}
        />
      </Container>
    </>
  );
}
