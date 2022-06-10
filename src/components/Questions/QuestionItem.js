import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";
import QuestionTime from "./QuestionTime";

export default function QuestionItem({
  id,
  name = "",
  email = "default",
  created_at,
  question,
  description,
  list = false,
}) {
  const linkedQuestionOrQuestion = list ? (
    <Link to={`/questions/${id}`} className="question-link">
      <h5 className="m-0 question">{question}</h5>
    </Link>
  ) : (
    <h5 className="m-0 question">{question}</h5>
  );

  return (
    <>
      <Row>
        <Col
          md={2}
          className="d-flex align-items-center justify-content-center"
        >
          <Avatar size={40} user={name || email} />
        </Col>
        <Col md={10}>
          <div className="m-0 user-created-time">
            asked <QuestionTime created={created_at} /> ago
          </div>
          {linkedQuestionOrQuestion}
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
    </>
  );
}
