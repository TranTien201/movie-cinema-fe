import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Banner from "../../components/Banner/Banner";
import SearchMovie from "../../components/Search/SearchMovie";
import {
  fetchNowShowingMovies,
  fetchComingSoonMovies,
} from "../../redux/movieSlice"; // Adjust the import based on your folder structure
import { toast } from "react-toastify";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const dispatch = useDispatch();
  const { nowShowingMovies, comingSoonMovies, loading, error } = useSelector(
    (state) => state.movie
  );
  const [activeTab, setActiveTab] = useState("NOW_SHOWING"); // Default to 'Now Showing'
  const [filteredMovies, setFilteredMovies] = useState([]); // Local state for filtered movies

  useEffect(() => {
    dispatch(fetchNowShowingMovies()); // Fetch Now Showing movies on mount
    dispatch(fetchComingSoonMovies()); // Fetch Coming Soon movies on mount
  }, []);

  useEffect(() => {
    // Filter movies based on the active tab
    if (activeTab === "NOW_SHOWING") {
      setFilteredMovies(nowShowingMovies);
    } else {
      setFilteredMovies(comingSoonMovies);
    }
  }, [activeTab, nowShowingMovies, comingSoonMovies]); // Update filteredMovies when the tab or movies change

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    toast.error("Failed to load movies");
    return <div>Error loading movies</div>; // Handle error state
  }

  const formatReleaseDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  return (
    <div>
      <Banner />
      <SearchMovie />
      <section className="movie-section padding-top padding-bottom">
        <div className="container">
          <div className="tab">
            <div className="section-header-2">
              <div className="left">
                <h2 className="title">Danh sách phim</h2>
                <p>Hãy nhớ đừng bỏ lỡ bộ phim hay ngày hôm nay nhé</p>
              </div>
              <ul className="tab-menu">
                <li
                  className={activeTab === "NOW_SHOWING" ? "active" : ""}
                  onClick={() => handleTabChange("NOW_SHOWING")}
                >
                  Đang chiếu
                </li>
                <li
                  className={activeTab === "COMING_SOON" ? "active" : ""}
                  onClick={() => handleTabChange("COMING_SOON")}
                >
                  Sắp chiếu
                </li>
              </ul>
            </div>
            <div className="tab-area mb-30-none " style={{ height: "800px" }}>
              <div className="tab-item active">
                <Slider {...settings}>
                  {filteredMovies.map((movie) => (
                    <div className="item slider-item" key={movie.movieId}>
                      <div className="movie-grid">
                        <div
                          className="movie-thumb c-thumb"
                          style={{ height: "500px" }}
                        >
                          <a href="#0">
                            <img
                              src={movie.poster || "images/movie/movie02.jpg"}
                              alt={movie.title}
                              style={{ height: "auto" }}
                            />
                          </a>
                        </div>
                        <div className="movie-content bg-one">
                          <h5 className="title m-0 text-center">
                            <Link to={`/movie/${movie.movieId}`}>
                              {movie.title}
                            </Link>
                          </h5>
                          <div className="movie-info">
                            <span
                              className="duration"
                              style={{ fontSize: "20px" }}
                            >
                              {movie.duration} PHÚT
                            </span>
                            <span className="separator">|</span>
                            <span
                              className="genre"
                              style={{ fontSize: "20px" }}
                            >
                              {movie.label.labelName}
                            </span>
                          </div>
                          <ul className="movie-rating-percent flex justify-center">
                            <span className="!text-center">
                              KHỞI CHIẾU {formatReleaseDate(movie.releaseDate)}
                            </span>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
