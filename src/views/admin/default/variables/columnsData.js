import { FaEdit, FaTrash } from "react-icons/fa";

export const columnsShowTimeByDate = [
  {
    Header: "Tên rạp",
    accessor: "theater.theaterName",
  },
  {
    Header: "Tên phim",
    accessor: "movie.title",
  },
  {
    Header: "Thời lượng",
    accessor: "movie.duration",
  },
  {
    Header: "Bắt đầu chiếu",
    accessor: "startTime",
  },
  {
    Header: "Kết thúc chiếu",
    accessor: "endTime",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => (
      <div style={{ display: "flex" }}>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          style={{
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaEdit></FaEdit>
        </button>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          style={{
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
    ),
  },
];

export const columnsDataDevelopment = [
  {
    Header: "Tên phim",
    accessor: "title",
  },
  {
    Header: "Poster Phim",
    accessor: "poster",
    Cell: ({ value }) => (
      <img src={value} alt="Thumbnail" width="80" height="80" />
    ),
  },
  {
    Header: "Thời lượng",
    accessor: "duration",
  },
  {
    Header: "Ngày công chiếu",
    accessor: "releaseDate",
  },
  {
    Header: "Ngày dừng chiếu",
    accessor: "endDate",
  },
  {
    Header: "Trạng thái phim",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }) => (
      <div style={{ display: "flex" }}>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          style={{
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaEdit></FaEdit>
        </button>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          style={{
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
    ),
  },
];

export const columnsDataCheck = [
  {
    Header: "Tên category",
    accessor: "categoryName",
  },
  {
    Header: "ACTION",
    accessor: "action",
    Cell: ({ row }) => <div></div>,
  },
];

export const columnsTheaterSeat = [
  {
    Header: "Tên rạp",
    accessor: "theaterName",
  },
  {
    Header: "Ghế thường",
    accessor: "seatCounts.NORMAL",
  },
  {
    Header: "Ghế VIP",
    accessor: "seatCounts.VIP",
  },
  {
    Header: "Ghế đôi",
    accessor: "seatCounts.COUPLE",
  },
  {
    Header: "ACTION",
    accessor: "action",
    Cell: ({ row }) => <div></div>,
  },
];

export const columnsDataLabel = [
  {
    Header: "Tên nhãn phim",
    accessor: "labelName",
  },
  {
    Header: "Mô tả nhãn phim",
    accessor: "description",
  },
  {
    Header: "ACTION",
    accessor: "action",
    Cell: ({ row }) => <div></div>,
  },
];

export const columnsDataColumns = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const columnsDataComplex = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];
