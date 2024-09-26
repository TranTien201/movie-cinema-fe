import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckTable from "../default/components/CheckTable";
import { columnsDataCheck } from "../default/variables/columnsData";
import { fetchAllCategories, addCategory } from "../../../redux/categorySlice"; // Cập nhật đường dẫn chính xác
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const CategoryOverview = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu và trạng thái từ Redux store
  const { categories, loading, error } = useSelector((state) => state.category);

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  // Hiển thị thông báo lỗi nếu có
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Có lỗi xảy ra khi tải dữ liệu");
    }
  }, [error]);

  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({ categoryName }));
    setCategoryName("");
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
    <div className="flex flex-1">
      <div className="mt-2 flex h-fit  items-center justify-between rounded-t-2xl  px-4 pt-4 pb-[20px]  dark:!bg-navy-700 dark:shadow-none">
        <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div class="mb-5">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tên thể loại phim
            </label>
            <input
              type="text"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Thể loại phim"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            ></input>
          </div>
          <button
            type="submit"
            class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              "Thêm thể loại phim"
            )}
          </button>
        </form>
      </div>
      <div className="mt-3 h-full w-full">
        {loading ? (
          <div className="text-center">Loading...</div> // Hiển thị thông báo loading
        ) : (
          <div>
            {categories.length > 0 ? (
              <CheckTable
                columnsData={columnsDataCheck}
                tableData={categories}
              />
            ) : (
              <div className="mt-6 text-center text-black">
                Không có dữ liệu để hiển thị
              </div> // Thông báo khi không có dữ liệu
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryOverview;
