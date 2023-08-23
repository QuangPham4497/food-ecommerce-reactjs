import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input, Spin } from "antd";

const ProductsList = () => {
  const { Search } = Input;
  const [productList, setProductList] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response = await axios.get(
          `http://localhost:5000/getProducts/${id}`,
          {
            params: {
              page: currentPage,
              limit: 6,
              searchKey: searchKey,
            },
          }
        );

        if (response.data.length === 0) {
          setHasMoreData(false);
        } else {
          setProductList((prevList) => [...prevList, ...response.data]);
        }
      } catch (error) {
        console.log("Error fetching data");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [currentPage, searchKey, id]);

  if (!productList) return "";

  const handleShowmore = () => {
    setLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col  justify-around px-4">
      <div className="text-center">
        <Search
          bordered={false}
          allowClear
          onSearch={(value) => {
            setLoading(true);
            // Clear the existing product list when new search key is entered
            setProductList([]);
            setSearchKey(value);
            setHasMoreData(true);
            // Reset current page to 1 when new search key is entered
            setCurrentPage(1);
          }}
          placeholder="Searching..."
          className="w-96 rounded-lg m-2 border-red-500 hover:border-red-500 focus:border-red-500"
        />
      </div>

      {/* show products */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
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
                    View
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
              {/* <button
            className="w-max h-auto bg-red-300 border-solid border-2 rounded-full text-white p-2"
            disabled={true}
          >
            Show more
          </button> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsList;
