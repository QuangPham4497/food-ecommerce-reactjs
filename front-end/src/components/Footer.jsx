import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 bg-red-500 text-white flex items-center justify-between">
      <Link to="/" className="font-bold text-xl">
        Food Order
      </Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default Footer;
