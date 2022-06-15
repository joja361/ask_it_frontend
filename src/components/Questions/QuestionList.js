import { totalNumOfQuestionsData } from "../../store/totalNumOfQuestions";
import QuestionItem from "./QuestionItem";
import { useSelector } from "react-redux";

function QuestionList({ questions }) {
  const { loadingTotalQuestions, totalQuestions } = useSelector(
    totalNumOfQuestionsData
  );

  if (!loadingTotalQuestions && totalQuestions === 0) {
    return <h4>No Question Asked</h4>;
  }
  return (
    <>
      {questions.map((questionData, i) => {
        const { id, name, email, question, description, created_at } =
          questionData;
        return (
          <div key={id} className="border-bottom py-2 question-item">
            <QuestionItem
              id={id}
              name={name}
              email={email}
              question={question}
              description={description}
              created_at={created_at}
              list={true}
            />
          </div>
        );
      })}
    </>
  );
}

export default QuestionList;
