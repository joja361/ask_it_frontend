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
import { getQuestionAndLikes, questionData } from "../store/questionSlice";
import { getResponsesAndLikes, responseData } from "../store/responseSlice";
import ErrorPage from "./ErrorPage";

function Question() {
  const dispatch = useDispatch();
  const { id: questionId } = useParams();

  const {
    loading: questionLoading,
    question,
    likes,
    error: questionError,
  } = useSelector(questionData);

  const { isAuthenticated } = useSelector(authData);

  const {
    loading: responsesLoading,
    loadingOnCreate,
    responses,
    likes: responseLikes,
    error: responsesError,
  } = useSelector(responseData);

  const {
    user_id: userId,
    question: questionText,
    description,
    created_at,
    name,
    email,
  } = question;

  useEffect(() => {
    dispatch(getQuestionAndLikes(questionId));
    dispatch(getResponsesAndLikes(questionId));
  }, [dispatch, questionId]);

  if (questionError.message || responsesError.message) {
    if (questionError.message) {
      return <ErrorPage message={questionError.message} />;
    }

    if (responsesError.message) {
      return <ErrorPage message={responsesError.message} />;
    }
  }

  const responseForm = () => {
    if (isAuthenticated) {
      if (loadingOnCreate) {
        return <Loading />;
      } else {
        return <ResponseForm questionId={questionId} />;
      }
    }
  };

  const loadingOrData =
    questionLoading || responsesLoading ? (
      <Loading />
    ) : (
      <>
        <QuestionItem
          questionid={questionId}
          userId={userId}
          name={name}
          email={email}
          question={questionText}
          description={description}
          created_at={created_at}
          likes={likes}
        />
        <ResponseList responses={responses} likes={responseLikes} />
        {responseForm()}
      </>
    );

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto wrapper">{loadingOrData}</Container>
    </>
  );
}

export default Question;
