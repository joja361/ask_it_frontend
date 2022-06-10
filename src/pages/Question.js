import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import QuestionItem from "../components/Questions/QuestionItem";
import { getQuestion, questionData } from "../store/questionSlice";

function Question() {
  const dispatch = useDispatch();
  const { id: questionId } = useParams();
  const { loading, question, error } = useSelector(questionData);

  const { question: questionText, description, created_at } = question;

  useEffect(() => {
    dispatch(getQuestion(questionId));
  }, []);

  const loadingOrQuestion = loading ? (
    <Loading />
  ) : (
    <QuestionItem
      question={questionText}
      description={description}
      created_at={created_at}
    />
  );

  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        {loadingOrQuestion}
      </Container>
    </>
  );
}

export default Question;
