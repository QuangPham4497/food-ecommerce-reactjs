import React from "react";

const Notification = () => {
  return (
    <div className="h-12 bg-red-500 text-white px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer ">
      <div className="animate-[blink_1s_infinite] hover:animate-none">
        Free delivery for all orders over $50. Order your food now!
      </div>
    </div>
  );
};

export default Notification;
