import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import { DiApple } from "react-icons/di";
import { DiAndroid } from "react-icons/di";
import { DiWindows } from "react-icons/di";

import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Progress from "../../../../components/progress";
import { Typography, Button, CardFooter } from "@material-tailwind/react";
import { FaUpload } from "react-icons/fa";
import Modal from "../../../../components/modal";
const DevelopmentTable = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { columnsData, tableData } = props;

  console.log(tableData);

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  useEffect(() => {
    initialState.pageSize = 5;
    initialState.pageIndex = 0;
  }, [columnsData, tableData]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5, globalFilter: "" },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    state,
    pageOptions,
    pageCount,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    setGlobalFilter,
    page,
    prepareRow,
    initialState,
    nextPage, // Use nextPage to go to the next page
    previousPage,
    canNextPage, // Use canNextPage to check if there is a next page
    canPreviousPage,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;
  initialState.pageSize = 11;

  return (
    <Card extra={"w-full h-full p-4"}>
      <div class="flex justify-end ...">
        <div className="flex gap-2 ">
          {/* <div className="relative w-max justify-items-end  items-end ">
            <div className="absolute inset-y-0 left-0 flex  items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
              required
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
            class="px-3  text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add <FaUpload className="ml-2 mb-1"></FaUpload>
          </button> */}
        </div>
      </div>

      <div class="h-full overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="mt-8 h-max w-full"
          variant="simple"
          color="gray-500"
          mb="24px"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700 "
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-3 text-[14px] text-black"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal  text-navy-700 dark:text-white"
            >
              {/* {page.getState().pagination.pageIndex + 1} of{" "} */}
              {}
              Trang {pageIndex + 1} của {pageOptions.length}
            </Typography>
            <div className="flex gap-2">
              <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                variant="outlined"
                size="sm"
                style={{ width: "150px" }}
              >
                Quay lại
              </Button>
              <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => nextPage()}
                disabled={!canNextPage}
                variant="outlined"
                size="sm"
                style={{ width: "150px" }}
              >
                Tiếp theo
              </Button>
            </div>
          </CardFooter>
        </div>

        {showModal ? (
          <>
            <Modal SetOpenForm={setShowModal}></Modal>
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default DevelopmentTable;
