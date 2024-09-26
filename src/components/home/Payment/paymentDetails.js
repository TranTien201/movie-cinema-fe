import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { FcCalendar } from "react-icons/fc";
const paymentDetails = (props) => {
  const today = new Date();
  const fourDays = new Date();
  fourDays.setDate(today.getDate() + 4);
  console.log(props);

  return (
    <div>
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        <div className="">
          {/* Info */}
          <label
            htmlFor="email"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Info name
          </label>
          <div className="relative">
            <input
              type="text"
              id="email"
              onFocus={() => {
                props.setPaying(true);
              }}
              name="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your name here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-gray-400"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
                />
              </svg>
            </div>
          </div>
          {/* Email */}
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              id="card-holder"
              name="card-holder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your email address here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
          {/* Phone number */}
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Phone number
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your phone number here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                height="1em"
                width="1em"
                className="h-4 w-4 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 01-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 00-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 00285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"
                />
              </svg>
            </div>
          </div>
          {/* Address */}
          <label
            htmlFor="card-holder"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="diaChiGiaoHang"
              name="diaChiGiaoHang"
              onChange={(e) => props.handleChangeInput(e)}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm  shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your address here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                viewBox="0 0 1000 1000"
                fill="currentColor"
                height="1em"
                className="h-4 w-4 text-gray-400"
                width="1em"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M426 50c13.333 0 20 6.667 20 20v860c0 13.333-6.667 20-20 20h-46c-13.333 0-20-6.667-20-20V490H184c-10.667 0-20-2-28-6-8-1.333-16.667-5.333-26-12L10 390c-6.667-4-10-9.333-10-16s3.333-12 10-16l120-82c9.333-6.667 18-10.667 26-12 5.333-2.667 14.667-4 28-4h176V70c0-13.333 6.667-20 20-20h46m564 208c6.667 4 10 9.333 10 16s-3.333 12-10 16l-118 82c-14.667 8-23.333 12-26 12-9.333 4-18.667 6-28 6H516l-40-230h342c12 0 21.333 1.333 28 4 6.667 2.667 15.333 6.667 26 12l118 82"
                />
              </svg>
            </div>
          </div>
          {/* Time order */}
          <div className="w-full grid grid-cols-2 gap-7 ">
            <div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Time Order
              </label>

              <div className="relative flex-shrink-0 ">
                <input
                  value={today.toLocaleDateString("en-GB")}
                  type="text"
                  id="card-no"
                  name="card-no"
                  disabled
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FcCalendar />
                </div>
              </div>
              <div></div>
            </div>

            <div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Delivery time
              </label>

              <div className="relative  flex-shrink-0">
                <input
                  value={fourDays.toLocaleDateString("en-GB")}
                  type="text"
                  id="card-no"
                  name="card-no"
                  disabled
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FcCalendar />
                </div>
              </div>
            </div>
          </div>
          {/* Payment method */}
          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Payment Method
          </label>
          <div className="w-full relative flex cursor-pointer select-none items-center justify-center rounded-lg border border-gray-300 p-4">
            <img className="w-14 object-contain" src={props.imgCod} alt="" />
            <div className="ml-5 items-center justify-center">
              <h2 className="mt-2 font-semibold  ">Cash on Delivery</h2>
            </div>
          </div>
          {/* Total */}
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">${props.totalAmt}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">$0.00</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${props.totalAmt}
            </p>
          </div>
        </div>

        <button
          className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          onClick={props.SubmitCheckout}
        >
          {props.checkoutloading ? (
            <div className="flex items-center justify-center">
              <ReactLoading
                type="spin"
                color="#ccc"
                height={20}
                width={20}
                className="h-16 w-16 text-gray-900/50"
              />
              <span className="ml-2 text-white animate-pulse">
                Processing ...
              </span>
            </div>
          ) : (
            <>Place Order</>
          )}
        </button>
      </div>
    </div>
  );
};

export default paymentDetails;
