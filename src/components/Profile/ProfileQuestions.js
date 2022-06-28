import { Link } from "react-router-dom";

export default function ProfileQuestions({ questions, user }) {
  return (
    <>
      {questions.length > 0 && (
        <h4 className="profile-hot-questions-header">questions from {user}</h4>
      )}
      {questions.map((question) => {
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
    </>
  );
}
