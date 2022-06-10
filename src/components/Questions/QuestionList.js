import QuestionItem from "./QuestionItem";
import Question from "./QuestionItem";

function QuestionList({ questions }) {
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
