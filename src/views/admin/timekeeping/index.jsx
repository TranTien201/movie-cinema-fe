import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckTable from "../default/components/CheckTable";
import { columnsTheaterSeat } from "../default/variables/columnsData";
import { updateTimeKeeping } from "../../../redux/timeKeepingSlice";
import { getPayRollForEmployee } from "../../../redux/accountSlice";

import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const TimeKeeping = () => {
  const dispatch = useDispatch();

  const { account, payRoll, isLoading } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getPayRollForEmployee(account.accountId));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTimeKeeping({ accountId: account.accountId }));
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
    <>
      <div className="flex flex-1">
        <div className="mt-2 flex h-fit  items-center justify-between rounded-t-2xl  px-4 pt-4 pb-[20px]  dark:!bg-navy-700 dark:shadow-none">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="block text-gray-90 text-black">
                <span>
                  Xin chào bạn <b>{account.username}</b>. Vui lòng chấm công
                  ngày hôm nay.
                </span>
              </div>
            </div>
            <button
              type="submit"
              className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={isLoading}
              style={{ width: "200px" }}
            >
              {isLoading ? (
                <ReactLoading
                  type="spin"
                  color="#ffffff"
                  height={24}
                  width={24}
                />
              ) : (
                "Chấm công"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-3 h-full w-full">
        {isLoading ? (
          <div className="text-center">Loading...</div> // Hiển thị thông báo loading
        ) : (
          <div>
            {payRoll.length > 0 ? (
              <>
                <CheckTable
                  columnsData={columnsTheaterSeat}
                  tableData={payRoll.hoursWorkerDTO}
                />
              </>
            ) : (
              <div className="mt-6 text-center text-black">
                Không có dữ liệu để hiển thị
              </div> // Thông báo khi không có dữ liệu
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TimeKeeping;
