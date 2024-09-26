import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { cod } from "../../assets/images/";
import { emptyCart } from "../../assets/images/";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/useContext";
import { resetCart } from "../../redux/orebiSlice";
import OrderSumary from "../../components/home/Payment/orderSumary";
import PaymentDetails from "../../components/home/Payment/paymentDetails";
import PaymentSuccess from "../../components/home/Payment/paymentSuccess";
import OrderStatuts from "../../components/home/Payment/orderStatuts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Payment = () => {
  const { dark, user, setNameAndToken, autoFetch } = useAppContext();
  const today = new Date();
  const nextDay = new Date();
  const twoDays = new Date();
  const threeDays = new Date();
  const fourDays = new Date();
  nextDay.setDate(today.getDate() + 1);
  twoDays.setDate(today.getDate() + 2);
  threeDays.setDate(today.getDate() + 3);
  fourDays.setDate(today.getDate() + 4);
  const dispatch = useDispatch();
  const [paying, setPaying] = useState(false);
  const [checkoutloading, setCheckoutloading] = useState(false);
  const products = useSelector((state) => state.orebiReducer.products);
  // const [totalAmt, setTotalAmt] = useState("");

  const [orderItem, setOrder] = useState([]);
  const str = Math.random().toString(36).substring(2, 12);

  const totalAmt = useMemo(() => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [products]);
  const orderAmt = useMemo(() => {
    return orderItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [orderItem]);
  const initState = {
    maDatHang: str,
    maKhachHang: 1,
    ngayDatHang: today.toLocaleDateString("en-GB"),
    ngayGiaoHang: fourDays.toLocaleDateString("en-GB"),
    diaChiGiaoHang: "",
    trangThaiDonHang: 0,
    maThanhToan: 1,
    tongTien: "",
  };
  const [state, setState] = useState(initState);
  const [succesPayment, setSuccesspayment] = useState(false);
  const SubmitCheckout = async () => {
    setCheckoutloading(true);
    try {
      const order = state;
      order.tongTien = totalAmt;
      const data = await autoFetch.post("don-hang/them", order);
      if (data.data.status === true) {
        setTimeout(() => {
          setCheckoutloading(false);
        }, 5000);
        setTimeout(() => {
          setOrder(products);
          inserOrderDetail();
          toast.success("Checkout successfully.");
          setSuccesspayment(true);
          dispatch(resetCart());
        }, 3000);
      }
    } catch (error) {}
  };
  const inserOrderDetail = async () => {
    try {
      const dataOrderDetail = products.map((item) => ({
        maSanPham: item._id,
        gia: item.price,
        soLuong: item.quantity,
        maDatHang: str,
      }));
      const data = await autoFetch.post(
        "don-hang-chi-tiet/them",
        dataOrderDetail
      );
      if (data.data.status === true) {
        console.log("Thêm Đơn Hàng chi tiết thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(checkoutloading);
  const handleChangeInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-container h-max mx-auto px-4">
      {/* Payment  succcess */}
      {succesPayment ? (
        <PaymentSuccess
          state={state}
          orderItem={orderItem}
          orderAmt={orderAmt}
        />
      ) : products.length === 0 ? (
        <>
          {/* Empty card component */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <div>
              <img
                className="w-80 rounded-lg p-4 mx-auto"
                src={emptyCart}
                alt="emptyCart"
              />
            </div>
            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl font-bold uppercase">
                Your Cart feels lonely.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your Shopping cart lives to serve. Give it purpose - fill it
                with books, electronics, videos, etc. and make it happy.
              </p>
              <Link to="/shop">
                <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className="w-full h-max grid sm:grid-cols-1 md:grid-cols-2">
            <Breadcrumbs title="Payment gateway" />
            {/* Order status */}
            <OrderStatuts paying={paying}></OrderStatuts>
          </div>
          <div className=" grid  sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 py-2">
            {/* order summary */}
            <OrderSumary products={products} imgCod={cod}></OrderSumary>

            {/* payment details */}
            <PaymentDetails
              totalAmt={totalAmt}
              setPaying={setPaying}
              SubmitCheckout={SubmitCheckout}
              checkoutloading={checkoutloading}
              handleChangeInput={handleChangeInput}
              imgCod={cod}
            ></PaymentDetails>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
