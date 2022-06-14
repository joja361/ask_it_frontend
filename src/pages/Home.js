import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import QuestionList from "../components/Questions/QuestionList";
import { authData } from "../store/authSlice";
import {
  getQuestions,
  getTotalNumOfQuesions,
  questionsData,
} from "../store/questionsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, questions, error, totalQuestions } =
    useSelector(questionsData);
  const { isAuthenticated } = useSelector(authData);
  const [numOfQuestions, setNumOfQuestions] = useState(0);

  const nextQuestions = () => {
    setNumOfQuestions((prev) => prev + 5);
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTotalNumOfQuesions());
    }
  }, []);

  useEffect(() => {
    dispatch(getQuestions(numOfQuestions));
  }, [dispatch, numOfQuestions]);

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        <Row>
          <Col>
            <h2>{`All Questions ${totalQuestions ? totalQuestions : ""}`}</h2>
          </Col>
          <Col xs="auto">
            <LinkContainer to={isAuthenticated ? "/questions/ask" : "/login"}>
              <Button>Ask Question</Button>
            </LinkContainer>
          </Col>
        </Row>
        {questions.length > 0 && <QuestionList questions={questions} />}
        {loading && <Loading />}
        {!loading && (
          <Button
            onClick={nextQuestions}
            disabled={numOfQuestions > totalQuestions}
          >
            get more questions
          </Button>
        )}
      </Container>
    </>
  );
}
