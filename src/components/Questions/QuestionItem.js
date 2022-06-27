import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authData } from "../../store/authSlice";
import Avatar from "../Avatar";
import QuestionLikeAndDislike from "./QuestionLikeAndDislike";
import QuestionTime from "./QuestionTime";
import QuestionTitle from "./QuestionTitle";

export default function QuestionItem({
  questionId,
  userId,
  name = "",
  email = "default",
  created_at,
  question,
  description,
  list = false,
  likes,
}) {
  const { user } = useSelector(authData);
  const { userId: loggedUserId } = user;

  let totalLikes = 0;
  likes.forEach((like) => (totalLikes += like.like_dislike));

  const didUserLikeOrDislikeQuestion = likes.filter(
    (like) => like.user_id === +loggedUserId
  )[0];

  let liked = null;
  let disliked = null;

  if (didUserLikeOrDislikeQuestion) {
    const likeOrDislike = didUserLikeOrDislikeQuestion.like_dislike;
    likeOrDislike === 1 ? (liked = true) : (liked = null);
    likeOrDislike === -1 ? (disliked = true) : (disliked = null);
  }

  return (
    <>
      <Row>
        <Col xs={3} md={2}>
          <Row>
            <div className="d-flex align-items-center justify-content-center">
              <Avatar size={40} user={email} />
            </div>
          </Row>
          <Row className="py-3">
            <QuestionLikeAndDislike
              questionId={questionId}
              totalLikes={totalLikes}
              like={liked}
              dislike={disliked}
            />
          </Row>
        </Col>
        <Col xs={9} md={10}>
          <Row>
            <QuestionTime
              created={created_at}
              name={name || email}
              userId={userId}
            />
          </Row>
          <Row>
            <QuestionTitle
              questionId={questionId}
              question={question}
              list={list}
            />
          </Row>
          <Row>
            <p className="description pt-1">{description}</p>
          </Row>
        </Col>
      </Row>
    </>
  );
}
