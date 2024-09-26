import React from "react";
import Form from "./components/Form";
import Upload from "../profile/components/Upload";
import UploadImage from "./components/UploadImage";
import DevelopmentTable from "../tables/components/DevelopmentTable";
import { columnsDataDevelopment } from "../default/variables/columnsData";
import tableDataDevelopment from "../tables/variables/tableDataDevelopment.json";
import ImgProduct from "./variables/ImgProduct.json";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
const Product = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <div className="w-full  mt-4 grid grid-cols-1 md:grid-cols-2  gap-4">
        <div className="w-full h-fit flex-row  md:items-center bg-white rounded-t-2xl  px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none    ">
          <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white">
            Infomation Product
          </h4>

          <Form></Form>
        </div>
        <div className="w-full ">
          <div className="w-full h-fit flex-row md:items-center bg-white rounded-t-2xl  px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none    ">
            <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white">
              Product Thumnail image
            </h4>

            <UploadImage></UploadImage>
          </div>
        </div>
      </div>
      <div className="w-full  mt-4 h-fit flex-row  md:items-center bg-white rounded-t-2xl  px-4 pt-4 pb-[20px] shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
        <h4 className="ml-1 mt-2 text-2xl font-bold text-navy-700 dark:text-white">
          Image Product
        </h4>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={ImgProduct}
        ></DevelopmentTable>
      </div>
    </div>
  );
};

export default Product;
