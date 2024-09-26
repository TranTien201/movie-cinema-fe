import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/all.min.css";
import "../../assets/css/animate.css";
import "../../assets/css/flaticon.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/odometer.css";
import "../../assets/css/owl.carousel.min.css";
import "../../assets/css/owl.theme.default.min.css";
import "../../assets/css/nice-select.css";
import "../../assets/css/jquery.animatedheadline.css";
import "../../assets/css/main.css";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/accountSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <header className="header-section" style={{ backgroundColor: "#0a1e5e" }}>
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <a
              href="index.html"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="http://res.cloudinary.com/du4kvj6e3/image/upload/v1727281984/vuazswz9dkjjgfcisi3b.png"
                alt="logo"
              />
              <h5 style={{ margin: 0, paddingLeft: 10 }}>Dream Cinema</h5>
            </a>
          </div>
          <ul class="menu">
            <li>
              <a href="#0" class="active">
                Home
              </a>
              <ul class="submenu">
                <li>
                  <a href="index.html">Home One</a>
                </li>
                <li>
                  <a href="#0" class="active">
                    Home Two
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">movies</a>
              <ul class="submenu">
                <li>
                  <a href="movie-grid.html">Movie Grid</a>
                </li>
                <li>
                  <a href="movie-list.html">Movie List</a>
                </li>
                <li>
                  <a href="movie-details.html">Movie Details</a>
                </li>
                <li>
                  <a href="movie-details-2.html">Movie Details 2</a>
                </li>
                <li>
                  <a href="movie-ticket-plan.html">Movie Ticket Plan</a>
                </li>
                <li>
                  <a href="movie-seat-plan.html">Movie Seat Plan</a>
                </li>
                <li>
                  <a href="movie-checkout.html">Movie Checkout</a>
                </li>
                <li>
                  <a href="popcorn.html">Movie Food</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">events</a>
              <ul class="submenu">
                <li>
                  <a href="events.html">Events</a>
                </li>
                <li>
                  <a href="event-details.html">Event Details</a>
                </li>
                <li>
                  <a href="event-speaker.html">Event Speaker</a>
                </li>
                <li>
                  <a href="event-ticket.html">Event Ticket</a>
                </li>
                <li>
                  <a href="event-checkout.html">Event Checkout</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">sports</a>
              <ul class="submenu">
                <li>
                  <a href="sports.html">Sports</a>
                </li>
                <li>
                  <a href="sport-details.html">Sport Details</a>
                </li>
                <li>
                  <a href="sports-ticket.html">Sport Ticket</a>
                </li>
                <li>
                  <a href="sports-checkout.html">Sport Checkout</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#0">pages</a>
              <ul class="submenu">
                <li>
                  <a href="about.html">About Us</a>
                </li>
                <li>
                  <a href="apps-download.html">Apps Download</a>
                </li>
                <li>
                  <a href="sign-in.html">Sign In</a>
                </li>
                <li>
                  <a href="sign-up.html">Sign Up</a>
                </li>
                <li>
                  <a href="404.html">404</a>
                </li>
              </ul>
            </li>
            {account ? (
              <li>
                <a href="#0">{account.username}</a>
                <ul class="submenu">
                  <li>
                    <a onClick={handleLogout} href="#">
                      Đăng xuất
                    </a>
                  </li>
                  <li>
                    <a href="apps-download.html">Apps Download</a>
                  </li>
                  <li>
                    <a href="sign-in.html">Sign In</a>
                  </li>
                  <li>
                    <a href="sign-up.html">Sign Up</a>
                  </li>
                  <li>
                    <a href="404.html">404</a>
                  </li>
                </ul>
              </li>
            ) : (
              <li class="header-button pr-0">
                <Link to={"/signin"}>Đăng nhập</Link>
              </li>
            )}
          </ul>
          <div className="header-bar d-lg-none">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
