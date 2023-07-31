import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Notification from "components/Notification";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <Notification />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
