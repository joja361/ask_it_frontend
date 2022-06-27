import { Container } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logo } from "../icons/logo";

function NavAuth({ to = "/", text, linkText }) {
  return (
    <>
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" onClick={() => window.location.href("/")}>
          {logo}
        </Link>
        <div className="d-flex align-items-center">
          {text && <h5 className="m-0 me-3 header">{text}</h5>}
          <Link to={to} className="link me-2">
            {linkText}
          </Link>
          <BsArrowRight className="arrow" size={25} />
        </div>
      </Container>
    </>
  );
}

export default NavAuth;
