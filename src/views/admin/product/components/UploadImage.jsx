import React, { useState } from "react";
import Dropzone from "react-dropzone";
import CheckTable from "../../default/components/CheckTable";
import { ColumnDataImageThumnail } from "../variables/columndata";
import Imgthumnail from "../variables/Imgthumnail.json";
import ComplexTable from "../../default/components/ComplexTable";
function UploadImage() {
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
    <div className="container mx-auto px-4">
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
                Drag and drop some files here, or click to select files
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
      <button
        type="button"
        class=" mt-2 text-white w-full justify-center  bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
      >
        <svg
          fill="none"
          class="w-10 h-10 me-2 -ms-1"
          aria-hidden="false"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 14.986a1 1 0 102 0V7.828l3.243 3.243 1.414-1.414L12 4 6.343 9.657l1.414 1.414L11 7.83v7.157z"
          />
          <path
            fill="currentColor"
            d="M4 14h2v4h12v-4h2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z"
          />
        </svg>
        Add Image
      </button>
      <div>
        <ComplexTable
          columnsData={ColumnDataImageThumnail}
          tableData={Imgthumnail}
        />
      </div>
    </div>
  );
}

export default UploadImage;
