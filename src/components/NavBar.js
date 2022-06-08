import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../asset/Logo.jpg";
import { authData, logout } from "../store/authSlice";
import Avatar from "./Avatar";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(authData);

  const { email } = user;

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
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
        {isAuthenticated && (
          <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
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
                    <Avatar size={20} user={email} useFor="navbar" />
                  </div>
                  <span className="align-self-center">Sign Out</span>
                </div>
              </Nav.Link>
            </Nav>
            <Nav className="align-items-center d-none d-sm-block">
              <NavDropdown
                title={<Avatar user={email} useFor="navbar" />}
                id="nav-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/my-profile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
