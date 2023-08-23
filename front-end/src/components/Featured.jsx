import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Featured = () => {
  const [productList, setProductList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const id = 2;
      setLoading(true);
      try {
        let response = await axios.get(
          `http://localhost:5000/getProducts/${id}`,
          {
            params: {
              limit: 8,
            },
          }
        );

        setProductList(response.data);
      } catch (error) {
        console.log("Error fetching data");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-screen h-full text-red-500">
      {/* WRAPPER */}

      {/* SINGLE ITEM */}
      <Swiper
        className="w-full flex"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          769: {
            slidesPerView: 4,
          },
          481: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        // navigation={true}
      >
        {productList.map((item) => (
          <SwiperSlide
            key={item.id}
            className="w-screen h-full flex flex-col items-baseline justify-evenly p-4 pb-6 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            <div>
              {/* IMAGE CONTAINER */}
              {item.img && (
                <div className=" flex-1 w-full h-full md:h-60 hover:scale-[1.04] transition-all duration-500">
                  <img
                    src={item.img}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
              {/* TEXT CONTAINER */}
              <div className=" flex-1 flex flex-col items-center justify-between text-center gap-1 ">
                <div className="">
                  <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                    {item.title}
                  </h1>
                  <p className="p-4 2xl:p-8 ">{item.desc}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">${item.price}</span>
                  <button className="bg-red-500 w-32 text-white p-2 rounded-md">
                    <Link to={`/productDetail/${item._id}`} key={item._id}>
                      View
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Featured;
