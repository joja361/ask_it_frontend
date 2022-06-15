import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadMoreButton from "../components/Buttons/LoadMoreButton";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import HeaderOfQuestionList from "../components/Questions/HeaderOfQuestionList";
import QuestionList from "../components/Questions/QuestionList";
import { getQuestions, questionsData } from "../store/questionsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(questionsData);
  const [numOfQuestions, setNumOfQuestions] = useState(0);

  useEffect(() => {
    dispatch(getQuestions(numOfQuestions));
  }, [dispatch, numOfQuestions]);

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        <HeaderOfQuestionList />
        <QuestionList questions={questions} />
        {loading && <Loading />}
        <LoadMoreButton
          loading={loading}
          loadMore={setNumOfQuestions}
          numOfQuestions={numOfQuestions}
        />
      </Container>
    </>
  );
}
