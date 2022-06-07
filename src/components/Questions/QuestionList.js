import { useEffect } from "react";
import { Col, Row, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, questionsData } from "../../store/questionsSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";
import { LinkContainer } from "react-router-bootstrap";

function QuestionList() {
  const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(questionsData);
  const navigate = useNavigate();
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
      <Row>
        <Col className="ms-auto">
          <h1>All Questions</h1>
        </Col>
        <Col>
          {/* THIS HERE NEED TO BE FIXED */}
          <LinkContainer to={isAuthenticated ? "/login" : "/singup"}>
            <Button>Ask Question</Button>
          </LinkContainer>
        </Col>
      </Row>
      {questions.map((questionData, i) => {
        const { name, question, created } = questionData;
        return (
          <div key={i} className="border-bottom p-3 question-wrapper">
            <Row>
              <Col
                md={2}
                className="d-flex align-items-center justify-content-center"
              >
                <Avatar />
              </Col>
              <Col md={10}>
                <div className="m-0 user-created-time">
                  created at
                  {/* created at <QuestionTime time={createdAt} /> */}
                </div>
                <h3 className="m-0">{question}</h3>
              </Col>
            </Row>
            <Row className="py-2">
              <Col md={2}>
                <QuestionLikeAndDislike />
              </Col>
              {/* <Col md={10}>{description}</Col> */}
            </Row>
          </div>
        );
      })}
    </>
  );
}

export default QuestionList;
