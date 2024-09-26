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

const PreLoader = () => (
  <div>
    <div class="preloader">
      <div class="preloader-inner">
        <div class="preloader-icon">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="overlay"></div>
    <a href="#0" class="scrollToTop">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
);

export default PreLoader;
