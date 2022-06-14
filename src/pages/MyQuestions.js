import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import NavBar from "../components/NavBar";
import QuestionList from "../components/Questions/QuestionList";
import { authData } from "../store/authSlice";
import Loading from "../components/Loading";

import {
  getMyQuestions,
  getTotalNumOfQuesions,
  myQuestionsData,
} from "../store/myQuestionsSlice";

export default function MyQuestions() {
  const dispatch = useDispatch();
  const { loading, myQuestions, error, totalQuestions } =
    useSelector(myQuestionsData);
  const { isAuthenticated, user } = useSelector(authData);

  const [numOfQuestions, setNumOfQuestions] = useState(5);

  const { email, userId } = user;

  const getMoreQuestions = () => {
    setNumOfQuestions((prev) => prev + 5);
  };

  useEffect(() => {
    dispatch(getTotalNumOfQuesions(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getMyQuestions(userId, numOfQuestions));
  }, [dispatch, numOfQuestions, userId]);

  const getMoreQuestionsButton = () => {
    const numOfQuestionsToCatch = numOfQuestions + 5;
    return numOfQuestionsToCatch > totalQuestions;
  };

  console.log(getMoreQuestionsButton());

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        <Row>
          <Col>
            <h2>My Questions</h2>
          </Col>
          <Col xs="auto">
            <LinkContainer to={isAuthenticated ? "/questions/ask" : "/login"}>
              <Button>Ask Question</Button>
            </LinkContainer>
          </Col>
        </Row>
        {myQuestions.length > 0 && <QuestionList questions={myQuestions} />}
        {loading && <Loading />}
        {getMoreQuestionsButton() && (
          <Button onClick={getMoreQuestions}>get more questions</Button>
        )}
      </Container>
    </>
  );
}
