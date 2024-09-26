import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
// import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  const productInfo = useMemo(() => location.state.item, [location.state.item]);
  useEffect(() => {
    // setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1  gap-3 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="w-full h-full grid grid-cols-1 xl:grid-cols-4  gap-3">
            <div className=" w-full h-full ">
              <div>
                <h3 className="font-titleFont text-xl md:text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
                  Products Images
                </h3>
                <div className="flex flex-row md:flex-col gap-2">
                  {productInfo &&
                    productInfo.img.map((item) => (
                      <div
                        key={item.maHinhAnh}
                        className="flex items-center gap-4 border-b-[1px] border-b-gray-300 p-auto"
                      >
                        <div>
                          <img
                            className="w-50"
                            src={`http://localhost:8080/hinh-anh/${item.duongDan}`}
                            alt={item.img}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className=" h-full w-full col-span-3">
              <img
                className="w-full h-full object-fill"
                src={`http://localhost:8080/thum-nail/${productInfo.thumail}`}
                alt={productInfo.thumail}
              />
            </div>
          </div>

          <div className="h-full w-full xl:col-span-2 xl-max:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
