import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { totalNumOfQuestionsData } from "../../store/totalNumOfQuestions";

export default function LoadMoreButton({ loading, loadMore, numOfQuestions }) {
  const { totalQuestions } = useSelector(totalNumOfQuestionsData);

  const disableButton = (prev, step, total) => {
    if (prev + step >= total) {
      return true;
    }
    return false;
  };

  const nextQuestions = () => {
    loadMore((prev) => prev + 5);
  };

  if (loading) {
    return;
  }

  if (disableButton(numOfQuestions, 5, totalQuestions)) {
    return;
  }

  return (
    <div className="d-flex justify-content-center">
      <Button variant="outline-primary load-more" onClick={nextQuestions}>
        LOAD MORE
      </Button>
    </div>
  );
}
