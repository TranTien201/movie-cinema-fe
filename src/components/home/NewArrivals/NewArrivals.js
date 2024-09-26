import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
const NewArrivals = ({ product }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: product.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {product.map((p) => {
          return (
            <div className="px-2" key={p._id}>
              <Product
                img={p.hinhAnhSanPham}
                _id={p.maSanPham}
                thumail={p.thumnailSanpham[0].duongDan}
                productName={p.tenSanPham}
                tag={p.theSanPham}
                price={p.giaBan}
                badge={true}
                des={p.moTa}
                category={p.tenTheLoai}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default NewArrivals;
