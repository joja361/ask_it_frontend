import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../asset/Logo.jpg";
import { logout } from "../store/authSlice";
import Avatar from "./Avatar";

function NavBar() {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="p-0" expand="sm">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image src={logo} className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/questions">
              Questions
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-questions">
              My Questions
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-profile" className="d-sm-none">
              My Profile
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/my-profile"
              className="d-sm-none"
              onClick={handleLogOut}
            >
              <div className="d-flex align-items-center ">
                <div className="me-1">
                  <Avatar size={20} />
                </div>
                <span className="align-self-center">Sign Out</span>
              </div>
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center d-none d-md-block">
            <NavDropdown title={<Avatar />} id="nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/my-profile">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogOut}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
