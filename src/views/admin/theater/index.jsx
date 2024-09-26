import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckTable from "../default/components/CheckTable";
import { columnsTheaterSeat } from "../default/variables/columnsData";
import {
  createTheaterSeatByFileUpload,
  fetchAllTheaterAndCountSeat,
} from "../../../redux/theaterSeatSlice"; // Cập nhật đường dẫn chính xác
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const TheaterSeat = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu và trạng thái từ Redux store
  // const { seats, loading, error } = useSelector((state) => state.seat);
  const { theaterSeats, loading, error } = useSelector(
    (state) => state.theaterSeat
  );
  useEffect(() => {
    dispatch(fetchAllTheaterAndCountSeat());
  }, [dispatch]);
  // Hiển thị thông báo lỗi nếu có
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Có lỗi xảy ra khi tải dữ liệu");
    }
  }, [error]);

  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTheaterSeatByFileUpload(file));
    // dispatch(signUpAccount({ username, email, password }));
    // setFormData({
    //   displayName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   agreement: true,
    // });
  };

  return (
    <>
      <div className="flex flex-1">
        <div className="mt-2 flex h-fit  items-center justify-between rounded-t-2xl  px-4 pt-4 pb-[20px]  dark:!bg-navy-700 dark:shadow-none">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="file"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                File chứa thông tin ghế và rạp
              </label>
              <input
                type="file"
                id="file"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
                required
              ></input>
            </div>
            <button
              type="submit"
              className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading}
              style={{ width: "200px" }}
            >
              {loading ? (
                <ReactLoading
                  type="spin"
                  color="#ffffff"
                  height={24}
                  width={24}
                />
              ) : (
                "Thêm dữ liệu"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-3 h-full w-full">
        {loading ? (
          <div className="text-center">Loading...</div> // Hiển thị thông báo loading
        ) : (
          <div>
            {theaterSeats.length > 0 ? (
              <CheckTable
                columnsData={columnsTheaterSeat}
                tableData={theaterSeats}
              />
            ) : (
              <div className="mt-6 text-center text-black">
                Không có dữ liệu để hiển thị
              </div> // Thông báo khi không có dữ liệu
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TheaterSeat;
