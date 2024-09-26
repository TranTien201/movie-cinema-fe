import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/all.min.css";
import "../../assets/css/animate.css";
import "../../assets/css/flaticon.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/odometer.css";
// import "../../assets/css/owl.carousel.min.css";
// import "../../assets/css/owl.theme.default.min.css";
import "../../assets/css/nice-select.css";
import "../../assets/css/jquery.animatedheadline.css";
import "../../assets/css/main.css";

const Footer = () => (
  <footer className="footer-section">
    <div className="newslater-section padding-bottom">
      <div className="container">
        <div
          className="newslater-container bg_img"
          data-background="./assets/images/newslater/newslater-bg01.jpg"
        >
          <div className="newslater-wrapper">
            <h5 className="cate">subscribe to Boleto </h5>
            <h3 className="title">to get exclusive benefits</h3>
            <form className="newslater-form">
              <input type="text" placeholder="Your Email Address" />
              <button type="submit">subscribe</button>
            </form>
            <p>We respect your privacy, so we never share your info</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="footer-top">
        <div className="logo">
          <a href="index-1.html">
            <img src="assets/images/footer/footer-logo.png" alt="footer" />
          </a>
        </div>
        <ul className="social-icons">{/* Add social icons here */}</ul>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-area">
          <div className="left">
            <p>
              Copyright © 2020.All Rights Reserved By <a href="#0">Boleto </a>
            </p>
          </div>
          <ul className="links">{/* Add footer links here */}</ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
