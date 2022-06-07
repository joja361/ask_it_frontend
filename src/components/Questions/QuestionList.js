import { useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getQuestions, questionsData } from "../../store/questionsSlice";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";

function QuestionList() {
  const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(questionsData);
  const isAuthenticated = useSelector(
    (store) => store.authStore.isAuthenticated
  );
  console.log(questions);

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
          {/* FIXME: check is this ok, also make UI better */}
          <LinkContainer to={isAuthenticated ? "/questions/ask" : "/login"}>
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
                {/* TODO: When getting questions we also need to provide name or email of user.  */}
                {/* <Avatar /> */}
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
