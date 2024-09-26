import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import UploadImage from "../../views/admin/product/components/UploadImage";
import Dropzone from "react-dropzone";
const Modal = (props) => {
  const [files, setFiles] = useState([]);

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

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-full max-w-4xl max-h-full">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Add Product image detail
              </h3>
              <button
                className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.SetOpenForm(false)}
              >
                <span className=" h-6 w-6 text-2xl block ">×</span>
              </button>
            </div>
            {/*body*/}
            <div className="relative  flex-auto">
              <form class="p-4 md:p-5">
                <div class="w-fit h-fit mx-auto  ">
                  <div className="w-full">
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Name
                    </label>
                    <select
                      id="category"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option selected="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                    </select>
                  </div>
                  <div className="mt-2 flex-col">
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Thumnail
                    </label>
                    <img
                      className="w-full"
                      src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                    ></img>
                  </div>
                  <div className="mt-2 ">
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Image Detail
                    </label>
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
                              Drag and drop some files here, or click to select
                              files
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
                              className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-lg focus:outline-none"
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
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.SetOpenForm(false)}
              >
                Close
              </button>
              <button
                type="submit"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save Change
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
