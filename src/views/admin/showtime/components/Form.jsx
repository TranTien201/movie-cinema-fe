import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTheaterAndCountSeat } from "../../../../redux/theaterSeatSlice";
import { fetchAllMovies } from "../../../../redux/movieSlice";
import { createShowtime } from "../../../../redux/showtimeSlice";

const Form = () => {
  const dispatch = useDispatch();

  const { theaterSeats } = useSelector((state) => state.theaterSeat);
  const { movies } = useSelector((state) => state.movie);
  const { loading } = useSelector((state) => state.showtime);

  const [formData, setFormData] = useState({
    startTime: "",
    theaterId: theaterSeats.length > 0 ? theaterSeats[0].theaterId : "",
    movieId: movies.length > 0 ? movies[0].movieId : "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      startTime: formData.startTime,
      theater: {
        theaterId: formData.theaterId,
      },
      movie: {
        movieId: formData.movieId,
      },
    };
    console.log(data);
    dispatch(createShowtime(data));
  };

  return (
    <div className="mt-2 w-full flex h-fit items-center justify-between rounded-t-2xl px-4 pt-4 pb-[20px] dark:!bg-navy-700 dark:shadow-none">
      <form style={{ display: "block", width: "100%" }} onSubmit={handleSubmit}>
        <div className="mt-3">
          <label
            htmlFor="startTime"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Thời gian chiếu
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="movieId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Chọn phim
          </label>
          <select
            id="movieId"
            value={formData.movieId}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          >
            {movies.map((movie) => (
              <option key={movie.movieId} value={movie.movieId}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <label
            htmlFor="theaterId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Chọn rạp phim
          </label>
          <select
            id="theaterId"
            value={formData.theaterId}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          >
            {theaterSeats.map((theaterSeat) => (
              <option key={theaterSeat.theaterId} value={theaterSeat.theaterId}>
                {theaterSeat.theaterName} có số lượng Ghế thường:{" "}
                {theaterSeat.seatCounts.NORMAL} - Ghế VIP:{" "}
                {theaterSeat.seatCounts.VIP} - Ghế đôi:{" "}
                {theaterSeat.seatCounts.COUPLE
                  ? theaterSeat.seatCounts.COUPLE
                  : 0}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Đang tạo suất chiếu...</p>
        ) : (
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
          >
            Thêm suất chiếu
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
