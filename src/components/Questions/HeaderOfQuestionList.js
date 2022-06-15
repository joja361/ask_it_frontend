import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { authData } from "../../store/authSlice";
import {
  getTotalNumOfQuestions,
  totaNulOfQuestionsData,
} from "../../store/totalNumOfQuestions";

export default function HeaderOfQuestionList({ myQuestions = false }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authData);
  const { loadingTotalQuestions, totalQuestions, errorTotalQuestions } =
    useSelector(totaNulOfQuestionsData);
  const { userId } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchMyQuestionsOrAll = myQuestions && userId;
      dispatch(getTotalNumOfQuestions(fetchMyQuestionsOrAll));
    }
  }, []);

  if (loadingTotalQuestions) {
    return <div className="questions-list-header"></div>;
  }

  const headerTitle = myQuestions ? "My Questions" : "All Questions";

  return (
    <Row className="questions-list-header">
      <Col>
        <h2>{`${headerTitle} ${totalQuestions ? totalQuestions : ""}`}</h2>
      </Col>
      <Col xs="auto">
        <LinkContainer to={isAuthenticated ? "/questions/ask" : "/login"}>
          <Button>Ask Question</Button>
        </LinkContainer>
      </Col>
    </Row>
  );
}
