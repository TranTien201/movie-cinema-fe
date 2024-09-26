import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieById } from "../../redux/movieSlice"; // Adjust path
import "../../assets/css/popup.css"; // Add your modal styles here

const MovieDetail = () => {
  const { _id } = useParams(); // Get movieId from URL
  const dispatch = useDispatch();

  const { movie, loading, error } = useSelector((state) => state.movie);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the movie by movieId when the component mounts
  useEffect(() => {
    if (_id) {
      dispatch(fetchMovieById(_id));
    }
  }, [dispatch, _id]);

  // Function to open the modal
  const handleVideoPopup = () => {
    setIsModalOpen(true);
    // window.open(movie.trailer, "_blank");
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Display loading spinner while data is being fetched */}
      {loading && <div>Loading...</div>}

      {/* Handle any error */}
      {error && <div>Error: {error}</div>}

      {/* Display movie details once data is available */}
      {!loading && movie ? (
        <>
          <section
            className="details-banner bg_img"
            data-background="images/banner/banner03.jpg"
          >
            <div className="container">
              <div className="details-banner-wrapper">
                <div className="details-banner-thumb">
                  <img src={movie.poster} alt={movie.title} />
                  <button
                    className="video-popup"
                    style={{ background: "None" }}
                    onClick={handleVideoPopup} // Trigger the modal when clicked
                  >
                    <img
                      src="http://res.cloudinary.com/du4kvj6e3/image/upload/v1727282076/h2fmigz1ch4alivysyag.png"
                      alt="movie"
                    />
                  </button>
                </div>
                <div className="details-banner-content offset-lg-3">
                  <h3 className="title">{movie.title}</h3>
                  <div className="movie-details" style={{ marginTop: "20px" }}>
                    <div>
                      <strong>Đạo diễn: </strong>
                      {movie.director || "N/A"}
                    </div>
                    <div>
                      <strong>Diễn viên: </strong>
                      {movie.cast}
                    </div>
                    <div>
                      <strong>Thể loại: </strong>
                      {movie.categories
                        .map((category) => category.categoryName)
                        .join(", ")}
                    </div>
                    <div>
                      <strong>Ngày phát hành: </strong>
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Ngày kết thúc: </strong>
                      {new Date(movie.endDate).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Thời lượng: </strong>
                      {movie.duration} Phút
                    </div>
                    <div>
                      <strong>Rated: </strong>
                      {movie.label.labelName} - {movie.label.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modal for Video */}
          {isModalOpen && (
            <div className="modal" onClick={handleCloseModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                <div className="iframe-wrapper">
                  <iframe
                    width="560"
                    height="315"
                    src={movie.trailer.replace("watch?v=", "embed/")}
                    // src="https://www.youtube.com/embed/clisHvIYcKo"
                    // src="https://www.youtube.com/embed/arJxCqviCl8"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* ==========Book-Section========== */}
          <section className="book-section bg-one">
            <div className="container">
              <div className="book-wrapper offset-lg-3">
                <div className="left-side">
                  <h5 style={{ marginBottom: "10px" }}>Mô tả phim</h5>
                  <p>{movie.description}</p>
                </div>
                <button className="custom-button" style={{ width: "200px" }}>
                  Đặt vé ngay
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MovieDetail;
