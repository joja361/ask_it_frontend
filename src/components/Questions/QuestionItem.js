import { Col, Row } from "react-bootstrap";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";
import QuestionTime from "./QuestionTime";
import QuestionTitle from "./QuestionTitle";

export default function QuestionItem({
  id,
  name = "",
  email = "default",
  created_at,
  question,
  description,
  list = false,
}) {
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
          <QuestionTime created={created_at} />
          <QuestionTitle id={id} question={question} list={list} />
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
