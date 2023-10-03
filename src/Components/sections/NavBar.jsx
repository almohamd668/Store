import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import ProfileAvatar from "../profileAvatar/ProfileAvatar";



import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";




function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
 

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const logOutHandler = () => {
    navigate("/Login", { replace: true });

    axios
      .get(`/auth/logout`, { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    localStorage.removeItem("token");
  };

  return (
    <>
    
      <Navbar expand="lg" bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link
              style={{ textDecoration: "none" }}
              className="nav-link"
              to="/"
            >
              Navbar
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
         
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link className="nav-link">Logo</Link>
              <Link className="nav-link" to="/">Pricing</Link>
            
              {token ? (
                <Link to="/" className="nav-link" onClick={logOutHandler}>
                  logout
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  login
                </Link>
              )}
            </Nav>
            {token && <ProfileAvatar />}
            </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default NavBar;
