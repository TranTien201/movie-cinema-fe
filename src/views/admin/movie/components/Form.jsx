import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLabels } from "../../../../redux/labelSlice";
import { fetchAllCategories } from "../../../../redux/categorySlice";
import { createMovie } from "../../../../redux/movieSlice";
import Dropzone from "react-dropzone";

const Form = () => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const handleDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };

  const handleRemove = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    trailer: "",
    description: "",
    director: "",
    cast: "",
    producer: "",
    releaseDate: "",
    endDate: "",
    label: "",
    categories: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { labels } = useSelector((state) => state.label);
  const { categories } = useSelector((state) => state.category);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCategoryChange = (category) => {
    const categoryIds = formData.categories.split(", ").filter(Boolean);
    const isSelected = categoryIds.includes(category.categoryId.toString());

    if (isSelected) {
      setFormData((prevData) => ({
        ...prevData,
        categories: categoryIds
          .filter((id) => id !== category.categoryId.toString())
          .join(", "),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        categories: [...categoryIds, category.categoryId].join(", "),
      }));
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(formData);

    data.append("title", formData.title);
    data.append("duration", parseInt(formData.duration)); // Convert duration to integer
    data.append("posterFile", files[0]); // File handling
    data.append("trailer", formData.trailer);
    data.append("description", formData.description);
    data.append("director", formData.director);
    data.append("cast", formData.cast);
    data.append("producer", formData.producer);
    data.append("releaseDate", formData.releaseDate);
    data.append("endDate", formData.endDate);
    data.append("label", formData.label);
    data.append("status", "COMING_SOON"); // Assuming status is a string or should be sent as such

    // Append each category individually as FormData expects separate fields for multiple values
    const categoriesArray = formData.categories
      .split(", ")
      .filter(Boolean)
      .map((category) => parseInt(category)); // Convert to integers
    categoriesArray.forEach((category) => {
      data.append("categories", category); // Appending each category as a separate field
    });

    // Log FormData entries for debugging
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    dispatch(createMovie(data)); // Dispatch action
  };

  return (
    <div className="mt-2 w-full flex h-fit items-center justify-between rounded-t-2xl px-4 pt-4 pb-[20px] dark:!bg-navy-700 dark:shadow-none">
      <form style={{ display: "block", width: "100%" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tên phim
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Tên phim"
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="duration"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Thời lượng phim
          </label>
          <input
            type="text"
            id="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Thời lượng phim"
            required
          ></input>
        </div>
        <div className="w-full">
          <div className="mt-4">
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center px-4 py-6 border-4 border-dashed rounded-lg hover:bg-gray-100"
                >
                  <input {...getInputProps()} />
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V18a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Đưa hình ảnh vào đây hoặc kéo thả
                  </p>
                </div>
              )}
            </Dropzone>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {files.map((file) => (
                <div key={file.name} className="relative">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <button
                    onClick={() => handleRemove(file)}
                    className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-lg focus:outline-none flex items-center justify-center m-1"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-400"
                    >
                      <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="trailer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Trailer Phim
          </label>
          <input
            type="text"
            id="trailer"
            value={formData.trailer}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Trailer phim"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mô tả phim
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Mô tả phim"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="director"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Đạo diễn phim
          </label>
          <input
            type="text"
            id="director"
            value={formData.director}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Đạo diễn phim"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="cast"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Diễn viên
          </label>
          <input
            type="text"
            id="cast"
            value={formData.cast}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Diễn viên"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="releaseDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ngày công chiếu
          </label>
          <input
            type="date"
            id="releaseDate"
            value={formData.releaseDate}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="endDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ngày kết thúc
          </label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </div>
        <div className="mt-3">
          <label
            htmlFor="label"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Chọn nhãn phim
          </label>
          <select
            id="label"
            value={formData.label}
            onChange={handleInputChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          >
            {labels.map((label) => (
              <option key={label.labelId} value={label.labelId}>
                {label.labelName} - {label.description}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Chọn thể loại phim
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={handleDropdownToggle}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light d-flex justify-self-start"
              style={{
                alignItems: "center",
              }}
            >
              {formData.categories
                ? formData.categories
                    .split(", ")
                    .map(
                      (id) =>
                        categories.find(
                          (cat) => cat.categoryId.toString() === id
                        )?.categoryName
                    )
                    .filter(Boolean)
                    .join(", ")
                : "Chọn thể loại phim"}
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto w-full">
                {categories.map((category, index) => (
                  <div key={index} className="p-2">
                    <label
                      className="flex h-4"
                      style={{ alignItems: "center" }}
                    >
                      <input
                        type="checkbox"
                        value={category.categoryId}
                        checked={formData.categories
                          .split(", ")
                          .includes(category.categoryId.toString())}
                        onChange={() => handleCategoryChange(category)}
                        className="form-checkbox w-3 h-3"
                      />
                      <span className="ml-2 text-black">
                        {category.categoryName}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
        >
          Thêm phim
        </button>
      </form>
    </div>
  );
};

export default Form;
