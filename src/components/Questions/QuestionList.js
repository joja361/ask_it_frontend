import { useSelector } from "react-redux";
import { totalNumOfQuestionsData } from "../../store/totalNumOfQuestions";
import QuestionItem from "./QuestionItem";

export default function QuestionList({ questions, likes }) {
  const { loadingTotalQuestions, totalQuestions } = useSelector(
    totalNumOfQuestionsData
  );

  if (!loadingTotalQuestions && totalQuestions === 0) {
    return <h4>No Question Asked</h4>;
  }
  return (
    <>
      {questions.map((questionData, i) => {
        const {
          user_id: userId,
          question_id: questionId,
          name,
          email,
          question,
          description,
          created_at,
        } = questionData;

        const questionLikesOrDislikes = likes.filter(
          (item) => item.question_id === +questionId
        );

        return (
          <div key={questionId} className="border-bottom pt-3">
            <QuestionItem
              questionId={questionId}
              userId={userId}
              name={name}
              email={email}
              question={question}
              description={description}
              created_at={created_at}
              list={true}
              likes={questionLikesOrDislikes}
            />
          </div>
        );
      })}
    </>
  );
}
