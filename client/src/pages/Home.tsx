import React from "react";
import RecentlyAdded from "components/RecentlyAdded/RecentlyAdded";
import Footer from "components/Footer/Footer";
import Hero from "components/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <hr />
      <RecentlyAdded />
      <hr />
      <Footer />
    </div>
  );
}
