import React, { useMemo, useEffect } from "react";
import Card from "../../../../components/card";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useColumnOrder,
} from "react-table";
import { Typography, Button, CardFooter } from "@material-tailwind/react";
const CheckTable = (props) => {
  const { columnsData, tableData } = props;

  console.log(columnsData);
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
    usePagination,
    useColumnOrder
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

  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Check Table
        </div>
        <div className="flex gap-2">
          <div className="relative w-max justify-items-end  items-end ">
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
            class="px-3  text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add <FaUpload className="ml-2 mb-1"></FaUpload>
          </button>
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="w-full"
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
                    className="border-b border-gray-200 pr-16 pb-[10px] text-start dark:!border-navy-700"
                    key={index}
                  >
                    <div className="text-xs font-bold tracking-wide text-gray-600 lg:text-xs">
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
                    let data = "";
                    if (cell.column.Header === "Tên nhãn phim") {
                      data = (
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Mô tả nhãn phim") {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "Tên rạp") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {" "}
                          {cell.value}{" "}
                        </p>
                      );
                    } else if (cell.column.Header === "Ghế thường") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value} ghế
                        </p>
                      );
                    } else if (cell.column.Header === "Ghế VIP") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value} ghế
                        </p>
                      );
                    } else if (cell.column.Header === "Ghế đôi") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value ? cell.value : 0} ghế
                        </p>
                      );
                    } else if (cell.column.Header === "Tên category") {
                      data = (
                        <div className="flex items-center">
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value}
                          </p>
                        </div>
                      );
                    } else if (cell.column.Header === "ACTION") {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="pt-[14px] pb-[16px] sm:text-[14px] flex"
                        >
                          <button
                            type="button"
                            class="focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-14 flex justify-center items-center"
                          >
                            <FaEdit></FaEdit>
                          </button>
                          <button
                            type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-14 flex justify-center items-center"
                          >
                            <FaTrash></FaTrash>
                          </button>
                        </td>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="pt-[14px] pb-[16px] sm:text-[14px]"
                      >
                        {data}
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                variant="outlined"
                size="sm"
                style={{ width: "150px" }}
              >
                Lùi
              </Button>
              <Button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => nextPage()}
                disabled={!canNextPage}
                variant="outlined"
                size="sm"
                style={{ width: "150px" }}
              >
                Tiến
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default CheckTable;
