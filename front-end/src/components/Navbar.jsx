import React from "react";
// import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
// import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/workinghour" },
  { id: 4, title: "Contact", url: "/" },
];

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        {links.map((link) => (
          <Link to={link.url} key={link.id} className="hover:bg-slate-300">
            {link.title}
          </Link>
        ))}
      </div>

      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link to="/">Food Order</Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">{/* <MobileMenu /> */}</div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <img src="/images/phone.png" alt="" width={20} height={20} />
          <span>123 456 78</span>
        </div>
        {!user ? (
          <Link to="/login" className="hover:bg-slate-300">
            Login
          </Link>
        ) : (
          <Link to="/orders" className="hover:bg-slate-300">
            Orders
          </Link>
        )}
        {/* <CartIcon /> */}
      </div>
    </div>
  );
};

export default Navbar;
