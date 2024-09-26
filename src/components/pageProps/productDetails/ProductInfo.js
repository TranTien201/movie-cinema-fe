import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { FaCircle } from "react-icons/fa";
const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className=" text-xl md:text-4xl font-semibold">
        Product: {productInfo.productName}
      </h2>
      <span className="w-max inline-flex items-center gap-2 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        <FaCircle></FaCircle>
        {productInfo.tag}
      </span>
      <p className=" text-lg md:text-xl font-semibold">
        Price: ${productInfo.price}
      </p>

      <p className="text-base text-gray-600">Description :{productInfo.des}</p>
      <p className="font-normal text-sm">
        <span className="text-base font-medium">
          {" "}
          Categories: {productInfo.category}
        </span>
      </p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: 1,
              image: `http://localhost:8080/thum-nail/${productInfo.thumail}`,
              badge: productInfo.badge,
              price: productInfo.price,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
