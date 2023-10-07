import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import LeftSideBar from "../../components/navbar/LeftSideBar";
import logo from "../../assets/logo2.png";
import { BsFillCartCheckFill } from "react-icons/bs";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signoutAction } from "../signupComponent/userAction";
import { setUser } from "../customerComponent/customerSlice";
const Header = () => {
  const { cart } = useSelector((state) => state.cartStore);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  async function signout() {
    signoutAction();
    localStorage.removeItem("refreshJWT");
    sessionStorage.removeItem("accessJWT");
    dispatch(setUser({}));
  }
  return (
    <Navbar
      expand="lg"
      className="bg-white shadow"
      style={{ position: "sticky", top: "0", zIndex: "99" }}
      variant="white"
    >
      <LeftSideBar />
      <Container>
        <Navbar.Brand href="/">
          <div className="w-100">
            <img src={logo} className="w-100" style={{ height: "3rem" }} />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user?._id ? (
              <>
                <Nav.Link>
                  {" "}
                  <Link to="/signin" className="nav-link">
                    Sign in
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/signup" className="nav-link">
                    Sign up
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  title="Logged In"
                  id="basic-nav-dropdown"
                  className="nav-link"
                >
                  <NavDropdown.Item
                    href="#action/3.1"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div> Dashboard</div>
                    <AiFillDashboard />
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/cart"
                      className="d-flex justify-content-between align-items-center nav-link"
                    >
                      <div>Cart</div>
                      <FaShoppingCart />
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link>
                  <Link to="/cart" className="nav-link">
                    <Badge badgeContent={cart?.length} color="primary">
                      <BsFillCartCheckFill />
                    </Badge>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="nav-link" onClick={signout}>
                    Sign out
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
