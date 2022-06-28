import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileQuestions from "../components/Profile/ProfileQuestions";
import ProfileStats from "../components/Profile/ProfileStats";
import { getUser, usersData } from "../store/userSlice";
import ErrorPage from "./ErrorPage";

export default function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loading, user, hotQuestions, error } = useSelector(usersData);

  const {
    name,
    email,
    created_at: createdAt,
    total_questions: totalQuestions,
    total_question_likes: totalQuestionLikes,
    total_responses: totalResponses,
    total_response_likes: totalResponseLikes,
  } = user;

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
        <ProfileHeader
          createdAt={createdAt}
          email={email}
          name={name}
          id={userId}
        />
        <ProfileStats
          totalQuestions={totalQuestions}
          totalResponses={totalResponses}
          totalQuestionLikes={totalQuestionLikes}
          totalResponseLikes={totalResponseLikes}
        />
        <ProfileQuestions questions={hotQuestions} user={name || email} />
      </Container>
    </>
  );
}
