import { useEffect } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import NavBar from "../components/NavBar";
import QuestionList from "../components/Questions/QuestionList";
import { getQuestions, questionsData } from "../store/questionsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(questionsData);
  const isAuthenticated = useSelector(
    (store) => store.authStore.isAuthenticated
  );

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const loadingOrQuestions = loading ? (
    <Spinner
      className="d-block mx-auto spinner-grow-empty-page"
      animation="grow"
      size="lg"
    />
  ) : (
    <QuestionList questions={questions} />
  );

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
        {loadingOrQuestions}
      </Container>
    </>
  );
}
