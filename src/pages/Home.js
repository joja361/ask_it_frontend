import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import QuestionList from "../components/Questions/QuestionList";

function Home() {
  return (
    <>
      <NavBar />
      <Container className="py-3 mx-auto question-wrapper">
        <QuestionList />
      </Container>
    </>
  );
}

export default Home;
