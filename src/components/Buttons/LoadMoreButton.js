import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { totaNulOfQuestionsData } from "../../store/totalNumOfQuestions";

export default function LoadMoreButton({ loading, loadMore, numOfQuestions }) {
  const { totalQuestions } = useSelector(totaNulOfQuestionsData);

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

  return <Button onClick={nextQuestions}>get more questions</Button>;
}
