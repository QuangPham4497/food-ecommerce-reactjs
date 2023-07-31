import React, { useEffect, useState } from "react";

import { Link, generatePath } from "react-router-dom";
import axios from "axios";

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const foods = products.foods;

  useEffect(() => {
    axios
      .get("http://localhost:5000/getProducts")
      .then((products) => {
        return setProducts(products.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)]  flex flex-col md:flex-row items-center">
      {foods?.map((category) => (
        <Link
          to={`/productsList/${category.id}`}
          key={category._id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2 border-solid border-green-500"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div
            className={`text-${category.color} w-1/2 flex flex-col justify-between`}
          >
            <div className="md:h-52">
              <h1 className="uppercase font-bold text-3xl ">
                {category.title}
              </h1>
              <p className="text-sm my-8">{category.desc}</p>
            </div>
            <button
              className={`hidden 2xl:block w-3/4 h-max bg-orange-600 text-white p-2 rounded-md`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
