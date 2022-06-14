import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import QuestionList from "../components/Questions/QuestionList";
import { authData } from "../store/authSlice";
import { getQuestions, questionsData } from "../store/questionsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(questionsData);

  const isAuthenticated = useSelector(
    (store) => store.authStore.isAuthenticated
  );
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  useEffect(() => {
    dispatch(getQuestions(numOfQuestions));
  }, [dispatch, numOfQuestions]);

  const getMoreQuestions = () => {
    setNumOfQuestions((prev) => prev + 5);
  };

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        <Row>
          <Col>
            <h2>All Questions</h2>
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
          <Button onClick={getMoreQuestions}>get more questions</Button>
        )}
      </Container>
    </>
  );
}
