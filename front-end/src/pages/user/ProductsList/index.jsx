import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsList = () => {
  const [productList, setProductList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getList")
      .then((products) => {
        const filteredProducts = products.data.filter(
          (item) => item.menuId === id
        );

        setProductList(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching data");
      });
  }, []);

  if (!productList) return "";

  return (
    <div className="flex flex-wrap text-red-500">
      {productList.map((item) => (
        <Link
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3  flex flex-col justify-between group odd:bg-fuchsia-50"
          to={`/productDetail/${item._id}`}
          key={item._id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <img
                src={item.img}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between p-4 font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
