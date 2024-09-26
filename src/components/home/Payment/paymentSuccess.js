import React from "react";
import { Link } from "react-router-dom";
import { FcShop } from "react-icons/fc";
import { motion } from "framer-motion";
const paymentSuccess = (props) => {
  const today = new Date();
  const fourDays = new Date();
  fourDays.setDate(today.getDate() + 4);
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-max mx-auto  bg-white rounded-lg shadow-md p-6 divide-y-2 divide-solid ">
          <div>
            <div className="flex items-center justify-center  ">
              <svg
                className="w-12 h-12 fill-current text-green-600 "
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800 mt-4">
              Payment successful
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Thank you for your purchase. Your order will be shipped soon.
            </p>
            <div className="flex items-center justify-center mt-4">
              <Link to="/shop">
                <button className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg">
                  <FcShop className="fill-current w-6 h-6 mr-2" />
                  <span>Continue Shopping</span>
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-2 py-4 sm:px-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="mt-1">
                <span className="text-base contents font-bold text-gray-400 uppercase ">
                  shipping address
                </span>
                <div className="flex flex-col  ">
                  <p className="text-sm font-medium text-gray-900 ">
                    Info name :
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Phone number :
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Address : {props.state.diaChiGiaoHang}
                  </p>
                </div>
              </div>
              <div className="mt-1 md:text-right  ">
                <span className="text-base contents font-bold text-gray-400 uppercase  ">
                  Payment method
                </span>
                <div className="flex flex-col  ">
                  <p className="text-sm font-medium text-gray-900">
                    Cash on Delivery
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    Time order : {today.toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Delivery time : {fourDays.toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-2  py-4 sm:px-6  ">
            <span className="text-base contents font-bold text-gray-400 uppercase ">
              ORDER ITEMS
            </span>
            <div className=" divide-y-2 divide-solid">
              {props.orderItem.map((item) => (
                <div className="w-full grid grid-cols-2 gap-1  bg-white md:flex-row ">
                  {/* column 1 */}
                  <div className="flex flex-col rounded-lg bg-white md:flex-row">
                    <img
                      className="m-2 h-24 w-30  rounded-md border object-cover object-center"
                      src={item.image}
                      alt=""
                    />
                    <div className="flex flex-col px-4 py-4 my-auto">
                      <span className="font-semibold ">{item.name}</span>
                      <span className="float-right text-gray-400">
                        {item.quantity} X ${item.price}
                      </span>
                    </div>
                  </div>
                  {/* column2 */}
                  <div className="flex flex-col px-4 py-4 text-right  ">
                    <p className="text-lg font-bold my-auto">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex flex-col  ">
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="mr-3 font-semibold text-gray-900">
                    ${props.orderAmt}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="mr-3 text-semibold font-semibold text-gray-900">
                    ${props.orderAmt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default paymentSuccess;
