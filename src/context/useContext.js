import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AppContext = createContext();

const useAppContext = () => {
  return useContext(AppContext);
};
const AppProvider = ({ children }) => {
  const autoFetch = axios.create({
    // @ts-ignore
    baseURL: "http://localhost:8080/",
  });
  // Add a request interceptor
  autoFetch.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  // Add a response interceptor
  autoFetch.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        logOut();
      }
      if (error.response.status === 403) {
        toast.error("This page is for admin use only. Please log in again.");
        logOut();
      }
      if (error.response.status === 11000) {
        toast.error("Something went wrong. Try again!");
      }
      return Promise.reject(error);
    }
  );
  const logOut = () => {
    toast.success("Logout Successfully");
  };
  return (
    <AppContext.Provider
      value={{
        autoFetch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { useAppContext, AppProvider };
