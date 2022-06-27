import { Col, Row } from "react-bootstrap";

export default function ProfileStats({
  totalQuestions,
  totalResponses,
  totalQuestionLikes,
  totalResponseLikes,
}) {
  return (
    <>
      <h4 className="profile-hot-questions-header">stats</h4>
      <Row className="profile-stats-wrapper justify-content-around">
        <Col md={2}>
          <p className="profile-stats-header">Questions</p>
          <p className="profile-stats-detail">{totalQuestions || 0}</p>
        </Col>
        <Col md={2}>
          <p className="profile-stats-header">Responses</p>
          <p className="profile-stats-detail">{totalResponses || 0}</p>
        </Col>
        <Col md={2}>
          <p className="profile-stats-header">Question Likes</p>
          <p className="profile-stats-detail">{totalQuestionLikes || 0}</p>
        </Col>
        <Col md={2}>
          <p className="profile-stats-header">Response Likes</p>
          <p className="profile-stats-detail">{totalResponseLikes || 0}</p>
        </Col>
      </Row>
    </>
  );
}
