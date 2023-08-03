import axios from "axios";
import Price from "components/Price";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const [productDetail, setProductDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getProductDetail/${id}`)
      .then((products) => {
        setProductDetail(products.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {productDetail.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <img
            src={productDetail.img}
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">
          {productDetail.title}
        </h1>
        <p>{productDetail.desc}</p>
        <Price
          price={productDetail.price}
          id={productDetail._id}
          options={productDetail.options}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
