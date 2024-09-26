import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
const orderSumary = (props) => {
  const today = new Date();
  const nextDay = new Date();
  const twoDays = new Date();
  const threeDays = new Date();
  const fourDays = new Date();
  nextDay.setDate(today.getDate() + 1);
  twoDays.setDate(today.getDate() + 2);
  threeDays.setDate(today.getDate() + 3);
  fourDays.setDate(today.getDate() + 4);
  console.log(props);
  return (
    <div>
      <div className="px-4 pt-8 h-max ">
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          {props.products.map((item) => (
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={item.image}
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{item.name}</span>
                <span className="float-right text-gray-400">
                  {item.quantity} X ${item.price}
                </span>
                <p className="text-lg font-bold">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg font-medium">Shipping Methods</p>
        <form className="mt-5 grid gap-6">
          <div className="relative">
            <input
              className="peer hidden"
              id="radio_1"
              type="radio"
              value={1}
              name="radio"
              checked
            />
            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
            <label
              className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              htmlFor="radio_1"
            >
              <img className="w-14 object-contain" src={props.imgCod} alt="" />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Cash on Delivery</span>
                <p className="text-slate-500 text-sm leading-6">
                  Delivery: 2-4 Days
                </p>
              </div>
            </label>
          </div>
        </form>
        {/* Timeline */}
        <p className="mt-8 text-lg font-medium">Intend time</p>
        <div className="rounded-lg bg-white">
          <div className="relative pl-8 sm:pl-32 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                {today.toLocaleDateString("en-GB")}
              </time>
              <div className="text-xl font-bold text-slate-900">
                Place an order
              </div>
            </div>

            <div className="text-slate-500"></div>
          </div>

          <div className="relative pl-8 sm:pl-32 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                {twoDays.toLocaleDateString("en-GB")}
              </time>
              <div className="text-xl font-bold text-slate-900">
                Pack and deliver to the shipping
              </div>
            </div>
            <div className="text-slate-500"></div>
          </div>

          <div className="relative pl-8 sm:pl-32 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                {threeDays.toLocaleDateString("en-GB")}
              </time>
              <div className="text-xl font-bold text-slate-900">
                The shipping unit receives the order
              </div>
            </div>
          </div>

          <div className="relative pl-8 sm:pl-32 py-6 group">
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
              <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                {fourDays.toLocaleDateString("en-GB")}
              </time>
              <div className="text-xl font-bold text-slate-900">
                It is expected that the order will be delivered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orderSumary;
