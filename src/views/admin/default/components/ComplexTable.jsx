import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
  useColumnOrder,
} from "react-table";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { useMemo } from "react";
import Progress from "../../../../components/progress";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Typography, Button, CardFooter } from "@material-tailwind/react";
const ComplexTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 3, globalFilter: "" },
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
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div class="mt-8 overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-5 tracking-wide pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
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
                    if (cell.column.Header === "Image Thumnail") {
                      data = (
                        <img
                          className="w-14 h-14 rounded-full object-cover"
                          src={`${cell.value}`}
                        ></img>
                      );
                    } else if (cell.column.Header === "Product name") {
                      data = (
                        <p className="text-sm tracking-wider font-bold ">
                          {" "}
                          {cell.value}
                        </p>
                      );
                    } else {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="pt-[14px] pb-[16px] sm:text-[14px]"
                        >
                          <div className="w-full flex">
                            <button
                              type="button"
                              class="focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              <FaEdit></FaEdit>
                            </button>
                            <button
                              type="button"
                              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              <FaTrash></FaTrash>
                            </button>
                          </div>
                        </td>
                      );
                    }
                    return (
                      <td
                        className="pt-[14px] pb-[18px] sm:text-[14px]"
                        {...cell.getCellProps()}
                        key={index}
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
      </div>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal  text-navy-700 dark:text-white"
        >
          {/* {page.getState().pagination.pageIndex + 1} of{" "} */}
          {}
          Page {pageIndex + 1} of {pageOptions.length}
        </Typography>
        <div className="flex gap-2">
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComplexTable;
