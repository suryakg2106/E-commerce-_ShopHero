import React from "react";
import HeroSection from "../Component/HeroSections";
import Shop from "../Component/CategorFilterSection";
import Productpage from "./Productpage";

const Home = () => {
  return (
    <>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 mt-12 mb-16">
        <Productpage />
      </section>
    </>
  );
};

export default Home;
