import { Col } from "react-bootstrap";
import image from "../../asset/thinkingabout.svg";

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
