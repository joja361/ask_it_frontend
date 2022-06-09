import { Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";
import QuestionTime from "./QuestionTime";

function QuestionList({ questions }) {
  return (
    <>
      {questions.map((questionData, i) => {
        const { id, name, email, question, description, created } =
          questionData;
        return (
          <div key={id} className="border-bottom py-2 question-item">
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
                <Link to={`/questions/${id}`} className="question-link">
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
