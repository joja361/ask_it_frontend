import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import QuestionItem from "../components/Questions/QuestionItem";
import ResponseForm from "../components/Response/ResponseForm";
import ResponseList from "../components/Response/ResponseList";
import { authData } from "../store/authSlice";
import { getQuestion, questionData } from "../store/questionSlice";
import { getResponses, responseData } from "../store/responseSlice";

function Question() {
  const dispatch = useDispatch();
  const { id: questionId } = useParams();

  const {
    loading: questionLoading,
    question,
    error: questionError,
  } = useSelector(questionData);

  const { isAuthenticated } = useSelector(authData);

  const {
    loading: responsesLoading,
    responses,
    error: responsesError,
  } = useSelector(responseData);

  const { question: questionText, description, created_at } = question;

  useEffect(() => {
    dispatch(getQuestion(questionId));
    dispatch(getResponses(questionId));
  }, []);

  const loadingOrQuestion = questionLoading ? (
    <Loading />
  ) : (
    <QuestionItem
      question={questionText}
      description={description}
      created_at={created_at}
    />
  );

  const loadingOrResponses = responsesLoading ? (
    <Loading />
  ) : (
    <ResponseList responses={responses} />
  );

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        {loadingOrQuestion}
        {loadingOrResponses}
        {isAuthenticated && <ResponseForm questionId={questionId} />}
      </Container>
    </>
  );
}

export default Question;
