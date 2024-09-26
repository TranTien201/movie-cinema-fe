import React from "react";
import { SplOfferData } from "../../../constants";

const ProductsOnSale = () => {
  return (
    <div>
      <h3 className="font-titleFont text-xl md:text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products on sale
      </h3>
      <div className="flex flex-row md:flex-col gap-2">
        {SplOfferData.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 p-auto"
          >
            <div>
              <img className="w-24" src={item.img} alt={item.img} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
