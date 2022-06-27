import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import ProfileStats from "../components/ProfileStats";
import { getUser, usersData } from "../store/userSlice";
import { convertDateToUserSince } from "../utils/time";
import ErrorPage from "./ErrorPage";

export default function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loading, user, hotQuestions, error } = useSelector(usersData);
  const [openModal, setOpenModal] = useState(false);

  const {
    name,
    email,
    created_at: createdAt,
    total_questions: totalQuestions,
    total_question_likes: totalQuestionLikes,
    total_responses: totalResponses,
    total_response_likes: totalResponseLikes,
  } = user;

  const userSince = convertDateToUserSince(createdAt);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <Loading />;
  }

  if (error.message) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <>
      <NavBar />
      <Container className="mx-auto wrapper">
        <div className="d-flex justify-content-between">
          <div className="profile">
            {email && <Avatar user={email} size={200} />}
            <h1 className="text-center profile-name">{name || email}</h1>
          </div>
          <Button variant="outline-primary">Change Password</Button>
        </div>
        <p className="profile-user-since">{userSince}</p>
        <ProfileStats
          totalQuestions={totalQuestions}
          totalResponses={totalResponses}
          totalQuestionLikes={totalQuestionLikes}
          totalResponseLikes={totalResponseLikes}
        />
        <h4 className="profile-hot-questions-header">
          questions from {name || email}
        </h4>
        {hotQuestions.map((question) => {
          const { id: questionId, question: hotQuestion } = question;
          return (
            <div key={questionId}>
              <Link
                className="profile-hot-questions-text"
                to={`/questions/${questionId}`}
              >
                {hotQuestion}
              </Link>
            </div>
          );
        })}
      </Container>
    </>
  );
}
