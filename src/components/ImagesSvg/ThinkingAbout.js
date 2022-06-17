import image from "../../asset/thinkingabout.svg";
import { Col } from "react-bootstrap";

function ThinkingAbout() {
  return (
    <a /*href="https://www.freepik.com/vectors/man"*/>
      <Col className="d-flex justify-content-center">
        <img src={image} className="login-img" alt="question" />
      </Col>
    </a>
  );
}

export default ThinkingAbout;
