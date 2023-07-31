import { featuredProducts } from "data/data";

import React from "react";

const Featured = () => {
  return (
    <div className="w-screen h-screen overflow-x-scroll text-red-500">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[100vh]  flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className=" flex-1 w-full h-20 md:h-60 hover:rotate-[60deg] transition-all duration-500">
                <img
                  src={item.img}
                  alt=""
                  className="object-contain h-full w-full"
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
                <button className="bg-red-500 text-white p-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
