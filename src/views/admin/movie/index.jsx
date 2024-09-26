import React, { useEffect } from "react";
import Form from "./components/Form";
import Upload from "../profile/components/Upload";
import UploadImage from "./components/UploadImage";
import DevelopmentTable from "../tables/components/DevelopmentTable";
import { columnsDataDevelopment } from "../default/variables/columnsData";
import tableDataDevelopment from "../tables/variables/tableDataDevelopment.json";
import ImgProduct from "./variables/ImgProduct.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../../../redux/movieSlice";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const Movie = () => {
  const [open, setOpen] = React.useState(false);

  const { movies, loading, error } = useSelector((state) => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <div className="w-full mt-4">
        <div className="w-full h-fit flex-row  md:items-center bg-white rounded-t-2xl  px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none    ">
          <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white">
            Thêm phim
          </h4>

          <Form></Form>
        </div>
      </div>
      <div className="w-full  mt-4 h-fit flex-row  md:items-center bg-white rounded-t-2xl  px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white">
          Danh sách các phim
        </h4>

        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : movies.length > 0 ? (
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={movies}
          ></DevelopmentTable>
        ) : (
          <p>Chưa có phim nào</p>
        )}
      </div>
    </div>
  );
};

export default Movie;
