import { useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { getQuestions, questionsData } from "../../store/questionsSlice";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";
import QuestionTime from "./QuestionTime";

function QuestionList() {
  const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(questionsData);
  const isAuthenticated = useSelector(
    (store) => store.authStore.isAuthenticated
  );

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  if (loading) {
    return (
      <Spinner
        className="d-block mx-auto spinner-grow-empty-page"
        animation="grow"
        size="lg"
      />
    );
  }

  return (
    <>
      {/* TODO: I am repeating className question-wrapper and mx-auto try to find better solution */}
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
      {questions.map((questionData, i) => {
        const { name, email, question, description, created } = questionData;
        return (
          <div key={i} className="border-bottom py-2 question-item">
            <Row>
              <Col
                md={2}
                className="d-flex align-items-center justify-content-center"
              >
                <Avatar size={40} user={name || email} />
              </Col>
              <Col md={10}>
                <div className="m-0 user-created-time">
                  asked <QuestionTime created={created} /> ago
                </div>
                <Link to={`/questions/${i}`} className="question-link">
                  <h5 className="m-0 question">{question}</h5>
                </Link>
              </Col>
            </Row>
            <Row className="py-2">
              <Col md={2} className="d-flex align-items-center">
                <QuestionLikeAndDislike />
              </Col>
              <Col md={10} className="description">
                {description}
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default QuestionList;
