import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authData } from "../../store/authSlice";
import Avatar from "../Avatar";
import ResponseLikeAndDislike from "./ResponseLikeDislike";
import ResponseTime from "./ResponseTime";

export default function ResponseItem({
  email,
  name,
  response,
  id,
  created,
  likes,
}) {
  const { user } = useSelector(authData);
  const { userId } = user;

  let totalLikes = 0;
  likes.forEach((like) => (totalLikes += like.like_dislike));

  const didUserLikeOrDisllikeResponse = likes.filter(
    (like) => like.user_id === +userId
  )[0];

  let like = null;
  let dislike = null;

  if (didUserLikeOrDisllikeResponse) {
    const likeOrDislike = didUserLikeOrDisllikeResponse.like_dislike;
    likeOrDislike === 1 && (like = true);
    likeOrDislike === -1 && (dislike = true);
  }

  return (
    <Row>
      <Col xs={3} md={2}>
        <Row>
          <div className="d-flex align-items-center justify-content-center">
            <Avatar size={40} user={email} />
          </div>
        </Row>
        <Row className="py-3">
          <ResponseLikeAndDislike
            id={id}
            totalLikes={totalLikes}
            like={like}
            dislike={dislike}
          />
        </Row>
      </Col>
      <Col xs={9} md={10}>
        <Row>
          <ResponseTime created={created} />
        </Row>
        <Row>
          <p className="response pt-1">{response}</p>
        </Row>
      </Col>
    </Row>
  );
}
