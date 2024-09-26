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

const Banner = () => (
  <section class="banner-section">
    <div
      class="banner-bg bg_img bg-fixed"
      data-background="./assets/images/banner/banner01.jpg"
    ></div>
    <div class="container">
      <div class="banner-content">
        <h1 class="title  cd-headline clip">
          <span class="d-block">book your</span> tickets for
          <span class="color-theme cd-words-wrapper p-0 m-0">
            <b class="is-visible">Movie</b>
            <b>Event</b>
            <b>Sport</b>
          </span>
        </h1>
        <p>
          Safe, secure, reliable ticketing.Your ticket to live entertainment!
        </p>
      </div>
    </div>
  </section>
);

export default Banner;
