import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { RiAccountBoxFill } from "react-icons/ri";

import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { logout } from "../Redux/action/signup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = ({ orderCount, setorderCount, setCartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.token);
  console.log(isAuthenticated, "dd");
  const handleLogout = async (event) => {
    event.preventDefault();
    await dispatch(logout());
    setCartItems([]);
    localStorage.removeItem("items");
    await localStorage.removeItem("totalValue");
    setorderCount(0);
    navigate("/");
  };
  const handleAuthenticated = () => {
    navigate("/login");
    toast("Please Login to access this resource");
  };

  const items = JSON.parse(localStorage.getItem("items"));

  const totalValue = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  setorderCount(totalValue);
  useEffect(() => {
    localStorage.setItem("totalValue", JSON.stringify(totalValue));
  }, [orderCount, totalValue]);

  console.log(orderCount, "<=====orderCount");

  return (
    <Fragment>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand>
            {" "}
            <Link to="/">
              <img src={logo} alt="" />{" "}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="end">
              <Nav.Link>
                <Link to="/about">About Us</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/contact"> Contact Us </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/policy">Policy </Link>
              </Nav.Link>

              <div className="headerIcons">
                {isAuthenticated ? (
                  <Link to="/cartItem">
                    {" "}
                    <p>
                      {" "}
                      <span> {orderCount} </span> <AiOutlineShoppingCart />{" "}
                    </p>
                  </Link>
                ) : (
                  <p onClick={handleAuthenticated}>
                    {" "}
                    <span> </span> <AiOutlineShoppingCart />
                  </p>
                )}

                {!isAuthenticated ? (
                  <>
                    {" "}
                    <Link to="/login">
                      <p>
                        <AiOutlineLogin />
                      </p>
                    </Link>
                    <Link to="/signup">
                      <p>
                        <RiAccountBoxFill />
                      </p>
                    </Link>
                  </>
                ) : (
                  <>
                    <span>
                      <IoMdArrowDropdownCircle />
                    </span>

                    <Link to="/myprofile">
                      <button className="logOutBtn">My Orders</button>
                    </Link>
                    <button className="logOutBtn" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </Fragment>
  );
};

export default Header;
