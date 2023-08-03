import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductsList = () => {
  const [productList, setProductList] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  if (!productList) return "";

  const fetchProducts = () => {
    axios
      .get(`http://localhost:5000/getProducts/${id}`, {
        params: {
          page: currentPage,
          limit: 3,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setHasMoreData(false);
        }
        setProductList((prevList) => [...prevList, ...response.data]);
      })
      .catch((error) => {
        console.log("Error fetching data");
      });
  };

  const handleShowmore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col  justify-around px-4">
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

      {/* button showmore */}
      {hasMoreData ? (
        <div className="my-2 text-center">
          <button
            className="w-max h-auto bg-red-500 border-solid border-2 rounded-full text-white p-2 active:bg-red-700"
            onClick={() => handleShowmore()}
          >
            Show more
          </button>
        </div>
      ) : (
        <div className="my-2 text-center">
          <button
            className="w-max h-auto bg-red-300 border-solid border-2 rounded-full text-white p-2"
            disabled={true}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
