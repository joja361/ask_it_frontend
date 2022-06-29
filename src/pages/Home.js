import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadMoreButton from "../components/Buttons/LoadMoreButton";
import HomeSvg from "../components/ImagesSvg/HomeSvg";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import HeaderOfQuestionList from "../components/Questions/HeaderOfQuestionList";
import QuestionList from "../components/Questions/QuestionList";
import TopUsersList from "../components/TopUsers/TopUsersList";
import {
  getHotQuestionsAndLikes,
  hotQuestionsData
} from "../store/hotQuestionsSlice";
import { getQuestionsAndLikes, questionsData } from "../store/questionsSlice";
import { getTopUsers, topUsersData } from "../store/topUsersSlice";
import ErrorPage from "./ErrorPage";

export default function Home() {
  const dispatch = useDispatch();
  const {
    loading,
    questions,
    likes,
    error: questionsError,
  } = useSelector(questionsData);

  const {
    loading: hotQuestionLoading,
    hotQuestions,
    likes: hotQuestionLikes,
    error: hotQuestionError,
  } = useSelector(hotQuestionsData);

  const {
    loading: topUsersLoading,
    topUsers,
    error: topUsersError,
  } = useSelector(topUsersData);

  const [numOfQuestions, setNumOfQuestions] = useState(0);

  useEffect(() => {
    dispatch(getQuestionsAndLikes(numOfQuestions));
    dispatch(getTopUsers());
    dispatch(getHotQuestionsAndLikes());
  }, [dispatch, numOfQuestions]);

  if (questionsError.message || hotQuestionError.message || topUsers.message) {
    if (questionsError.message) {
      return <ErrorPage message={questionsError.message} />;
    }
    if (hotQuestionError.message) {
      return <ErrorPage message={hotQuestionError.message} />;
    }
    if (topUsersError.message) {
      return <ErrorPage message={topUsersError.message} />;
    }
  }

  return (
    <>
      <NavBar />
      <Container className="mx-auto wrapper">
        <HomeSvg />
        <HeaderOfQuestionList />
        <QuestionList questions={questions} likes={likes} />
        {loading && <Loading height={660} />}
        <LoadMoreButton
          loading={loading}
          loadMore={setNumOfQuestions}
          numOfQuestions={numOfQuestions}
        />
        <TopUsersList topUsers={topUsers} loading={topUsersLoading} />
        <h2 className="question-header">Hot Questions</h2>
        <QuestionList questions={hotQuestions} likes={hotQuestionLikes} />
        {hotQuestionLoading && <Loading height={600} />}
      </Container>
    </>
  );
}
