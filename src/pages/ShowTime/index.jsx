import React from "react";

const ShowTime = () => {
  return (
    <>
      <section
        class="details-banner hero-area bg_img"
        data-background="./assets/images/banner/banner03.jpg"
      >
        <div class="container">
          <div class="details-banner-wrapper">
            <div class="details-banner-content">
              <h3 class="title">Venus</h3>
              <div class="tags">
                <a href="#0">English</a>
                <a href="#0">Hindi</a>
                <a href="#0">Telegu</a>
                <a href="#0">Tamil</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Book Section */}
      <section className="book-section bg-one">
        <div className="container">
          <form
            className="ticket-search-form two"
            style={{ justifyContent: "space-evenly" }}
          >
            {/* Date Selection */}
            <div className="form-group" style={{ flexWrap: "nowrap" }}>
              <div className="thumb">
                <img src="images/ticket/date.png" alt="ticket-date" />
              </div>
              <span className="type">Date</span>
              <select
                className="select-bar"
                style={{ background: "None", border: "none" }}
              >
                <option value="23/10/2020" className="text-black">
                  23/10/2020
                </option>
                <option value="24/10/2020" className="text-black">
                  24/10/2020
                </option>
                <option value="25/10/2020" className="text-black">
                  25/10/2020
                </option>
                <option value="26/10/2020" className="text-black">
                  26/10/2020
                </option>
              </select>
            </div>

            {/* Cinema Selection */}
            <div
              className="form-group"
              style={{ flexWrap: "nowrap", width: "300px", overflow: "auto" }}
            >
              <div className="thumb">
                <img src="images/ticket/cinema.png" alt="ticket-cinema" />
              </div>
              <span className="type">Cinema</span>
              <select
                className="select-bar"
                style={{ background: "None", border: "none" }}
              >
                <option value="Awaken">Awaken</option>
                <option value="Venus">Venus</option>
                <option value="Wanted">Wanted</option>
                <option value="Joker">Joker</option>
                <option value="Fid">Fid</option>
                <option value="Kidio">Kidio</option>
                <option value="Mottus">Mottus</option>
              </select>
            </div>
          </form>
        </div>
      </section>

      {/* Ticket Plan Section */}
      <div className="ticket-plan-section padding-bottom padding-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 mb-5 mb-lg-0">
              <ul className="seat-plan-wrapper bg-five">
                {/* Cinema List */}
                {[
                  "Genesis Cinema",
                  "The Beach",
                  "City Work",
                  "Box Park",
                  "La Mer",
                  "Wanted",
                ].map((cinema, index) => (
                  <li key={index} className={index === 2 ? "active" : ""}>
                    <div className="movie-name">
                      <div className="icons">
                        <i className="far fa-heart"></i>
                        <i className="fas fa-heart"></i>
                      </div>
                      <a href="#0" className="name">
                        {cinema}
                      </a>
                      <div className="location-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                    </div>

                    {/* Movie Schedule */}
                    <div className="movie-schedule">
                      {["09:40", "13:45", "15:45", "19:50"].map(
                        (time, timeIndex) => (
                          <div
                            key={timeIndex}
                            className={`item ${
                              index === 2 && timeIndex === 1 ? "active" : ""
                            }`}
                          >
                            {time}
                          </div>
                        )
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowTime;
