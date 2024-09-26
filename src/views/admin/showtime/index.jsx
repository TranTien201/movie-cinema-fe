import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import DevelopmentTable from "../tables/components/DevelopmentTable";
import { columnsShowTimeByDate } from "../default/variables/columnsData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShowtimesByDate } from "../../../redux/showtimeSlice";

const ShowTime = () => {
  const [open, setOpen] = React.useState(false);

  const { dateShowtimes, dates, theaters, loading, error } = useSelector(
    (state) => state.showtime
  );

  const [date, setDate] = useState(dates.length > 0 ? dates[0] : "");
  const [theater, setTheater] = useState(
    theaters.length > 0 ? theaters[0].theaterId : ""
  );
  const [showTimeInDate, setShowTimeInDate] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllShowtimesByDate());
  }, [dispatch]);

  useEffect(() => {
    console.log("Date: ", dateShowtimes);

    if (dateShowtimes && dateShowtimes[date]) {
      // console.log("Date: ", dateShowtimes[date]);
      const filteredShowtimes = dateShowtimes[date].filter((showtime) => {
        return showtime.theater.theaterId === parseInt(theater);
      });
      console.log(filteredShowtimes);

      setShowTimeInDate(filteredShowtimes);
    }
  }, [date, dateShowtimes, theater]);

  return (
    <div>
      <div className="w-full mt-4">
        <div className="w-full h-fit flex-row md:items-center bg-white rounded-t-2xl px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
          <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white">
            Thêm suất chiếu của phim
          </h4>
          <Form></Form>
        </div>
      </div>
      <div className="w-full mt-4 h-fit flex-row md:items-center bg-white rounded-t-2xl px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white w-3/5">
            Suất chiếu phim theo ngày
          </h4>
          {!loading ? (
            <select
              className="ml-4 p-2 border rounded w-2/6 text-black"
              onChange={(e) => setDate(e.target.value)}
            >
              {dates.map((date, index) => (
                <option value={date} key={index}>
                  {date}
                </option>
              ))}
            </select>
          ) : (
            ""
          )}
          {!loading ? (
            <select
              className="ml-4 p-2 border rounded w-2/6 text-black"
              onChange={(e) => setTheater(e.target.value)}
            >
              {theaters.map((theater, index) => (
                <option value={theater.theaterId} key={index}>
                  {theater.theaterName}
                </option>
              ))}
            </select>
          ) : (
            ""
          )}
        </div>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : showTimeInDate.length > 0 ? (
          <DevelopmentTable
            columnsData={columnsShowTimeByDate}
            tableData={showTimeInDate}
          ></DevelopmentTable>
        ) : (
          <p>Chưa có phim nào</p>
        )}
      </div>
    </div>
  );
};

export default ShowTime;
