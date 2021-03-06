import { Link } from "react-router-dom";

export default function QuestionTitle({ questionId, question, list }) {
  const linkedQuestionOrNot = list ? (
    <Link to={`/questions/${questionId}`} className="question-link">
      <h5 className="m-0 question">{question}</h5>
    </Link>
  ) : (
    <h5 className="m-0 question">{question}</h5>
  );

  return <>{linkedQuestionOrNot}</>;
}
