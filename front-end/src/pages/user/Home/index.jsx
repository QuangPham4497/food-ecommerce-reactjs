import React from "react";
import Featured from "components/Featured";
import Offer from "components/Offer";
import Slider from "components/Slider";

const Homepage = () => {
  return (
    <div className="">
      <Slider />
      <Featured />
      <Offer />
    </div>
  );
};

export default Homepage;
