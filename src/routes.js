import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default";

// Auth Imports
import SignIn from "./views/auth/SignIn";
import Profile from "./views/admin/profile";
// import DataTables from "./views/admin/tables";

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdLock,
  MdCategory,
  MdShoppingBag,
  MdProductionQuantityLimits,
} from "react-icons/md";
import CategoryOverview from "./views/admin/category";
import Product from "./views/admin/product";
import Movie from "./views/admin/movie";
import Order from "./views/admin/order";
import LabelOverview from "./views/admin/label";
import TheaterSeat from "views/admin/theater";
import ShowTime from "views/admin/showtime";
import TimeKeeping from "views/admin/timekeeping";

const routes = [
  {
    name: "Trang Chủ",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Thể loại phim",
    layout: "/admin",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <CategoryOverview />,
    secondary: true,
  },
  {
    name: "Nhãn phim",
    layout: "/admin",
    path: "label",
    icon: <MdCategory className="h-6 w-6" />,
    component: <LabelOverview />,
    secondary: true,
  },
  {
    name: "Phim",
    layout: "/admin",
    path: "movie",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <Movie />,
    secondary: true,
  },
  {
    name: "Rạp chiếu",
    layout: "/admin",
    path: "theater-seat",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <TheaterSeat />,
    secondary: true,
  },
  {
    name: "Suất chiếu",
    layout: "/admin",
    path: "showtime",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <ShowTime />,
    secondary: true,
  },
  {
    name: "Chấm công",
    layout: "/admin",
    path: "timekeeping",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <TimeKeeping />,
    secondary: true,
  },
  {
    name: "Product",
    layout: "/admin",
    path: "product",
    icon: <MdProductionQuantityLimits className="h-6 w-6" />,
    component: <Product />,
    secondary: true,
  },
  {
    name: "Order",
    layout: "/admin",
    icon: <MdShoppingBag className="h-6 w-6" />,
    path: "order",
    component: <Order />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
