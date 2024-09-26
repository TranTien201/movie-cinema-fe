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

const SearchTicket = () => (
  <section className="search-ticket-section padding-top pt-lg-0">
    <div className="container">
      <div
        className="search-tab bg_img"
        data-background="../../assets/images/ticket/ticket-bg01.jpg"
      >
        <div className="row align-items-center mb--20">
          <div className="col-lg-6 mb-20">
            <div className="search-ticket-header">
              <h6 className="category">welcome to Boleto </h6>
              <h3 className="title">what are you looking for</h3>
            </div>
          </div>
          <div className="col-lg-6 mb-20">
            <ul className="tab-menu ticket-tab-menu">
              <li className="active">
                <div className="tab-thumb">
                  <img
                    src="../../assets/images/ticket/ticket-tab01.png"
                    alt="ticket"
                  />
                </div>
                <span>movie</span>
              </li>
              <li>
                <div className="tab-thumb">
                  <img
                    src="../../assets/images/ticket/ticket-tab02.png"
                    alt="ticket"
                  />
                </div>
                <span>events</span>
              </li>
              <li>
                <div className="tab-thumb">
                  <img
                    src="../../assets/images/ticket/ticket-tab03.png"
                    alt="ticket"
                  />
                </div>
                <span>sports</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-area">
          <div className="tab-item active">
            <form className="ticket-search-form">
              <div className="form-group large">
                <input type="text" placeholder="Search for Movies" />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="../../assets/images/ticket/city.png" alt="ticket" />
                </div>
                <span className="type">city</span>
                <select className="select-bar">
                  <option value="london">London</option>
                  <option value="dhaka">dhaka</option>
                  <option value="rosario">rosario</option>
                  <option value="madrid">madrid</option>
                  <option value="koltaka">kolkata</option>
                  <option value="rome">rome</option>
                  <option value="khoksa">khoksa</option>
                </select>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="../../assets/images/ticket/date.png" alt="ticket" />
                </div>
                <span className="type">date</span>
                <select className="select-bar">
                  <option value="26-12-19">23/10/2020</option>
                  <option value="26-12-19">24/10/2020</option>
                  <option value="26-12-19">25/10/2020</option>
                  <option value="26-12-19">26/10/2020</option>
                </select>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img
                    src="../../assets/images/ticket/cinema.png"
                    alt="ticket"
                  />
                </div>
                <span className="type">cinema</span>
                <select className="select-bar">
                  <option value="Awaken">Awaken</option>
                  <option value="dhaka">dhaka</option>
                  <option value="rosario">rosario</option>
                  <option value="madrid">madrid</option>
                  <option value="koltaka">kolkata</option>
                  <option value="rome">rome</option>
                  <option value="khoksa">khoksa</option>
                </select>
              </div>
            </form>
          </div>
          <div className="tab-item">
            <form className="ticket-search-form">
              <div className="form-group large">
                <input type="text" placeholder="Search for Events" />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="../../assets/images/ticket/city.png" alt="ticket" />
                </div>
                <span className="type">city</span>
                <select className="select-bar">
                  <option value="london">London</option>
                  <option value="dhaka">dhaka</option>
                  <option value="rosario">rosario</option>
                  <option value="madrid">madrid</option>
                  <option value="koltaka">kolkata</option>
                  <option value="rome">rome</option>
                  <option value="khoksa">khoksa</option>
                </select>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="../../assets/images/ticket/date.png" alt="ticket" />
                </div>
                <span className="type">date</span>
                <select className="select-bar">
                  <option value="26-12-19">23/10/2020</option>
                  <option value="26-12-19">24/10/2020</option>
                  <option value="26-12-19">25/10/2020</option>
                  <option value="26-12-19">26/10/2020</option>
                </select>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img
                    src="../../assets/images/ticket/cinema.png"
                    alt="ticket"
                  />
                </div>
                <span className="type">event</span>
                <select className="select-bar">
                  <option value="angular">angular</option>
                  <option value="startup">startup</option>
                  <option value="rosario">rosario</option>
                  <option value="madrid">madrid</option>
                  <option value="koltaka">kolkata</option>
                  <option value="Last-First">Last-First</option>
                  <option value="wish">wish</option>
                </select>
              </div>
            </form>
          </div>
          <div className="tab-item">
            <form className="ticket-search-form">
              <div className="form-group large">
                <input type="text" placeholder="Search fo Sports" />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="../../assets/images/ticket/city.png" alt="ticket" />
                </div>
                <span className="type">city</span>
                <select className="select-bar">
                  <option value="london">London</option>
                  <option value="dhaka">dhaka</option>
                  <option value="rosario">rosario</option>
                  <option value="madrid">madrid</option>
                  <option value="koltaka">kolkata</option>
                  <option value="rome">rome</option>
                  <option value="khoksa">khoksa</option>
                </select>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img src="../../assets/images/ticket/date.png" alt="ticket" />
                </div>
                <span className="type">date</span>
                <select className="select-bar">
                  <option value="26-12-19">23/10/2020</option>
                  <option value="26-12-19">24/10/2020</option>
                  <option value="26-12-19">25/10/2020</option>
                  <option value="26-12-19">26/10/2020</option>
                </select>
              </div>
              <div className="form-group">
                <div className="thumb">
                  <img
                    src="../../assets/images/ticket/cinema.png"
                    alt="ticket"
                  />
                </div>
                <span className="type">sports</span>
                <select className="select-bar">
                  <option value="football">football</option>
                  <option value="cricket">cricket</option>
                  <option value="cabadi">cabadi</option>
                  <option value="madrid">madrid</option>
                  <option value="gadon">gadon</option>
                  <option value="rome">rome</option>
                  <option value="khoksa">khoksa</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SearchTicket;
