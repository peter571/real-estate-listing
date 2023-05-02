import React from "react";
import Trending from "../components/Trending/Trending";
import RecentlyAdded from "../components/RecentlyAdded/RecentlyAdded";
import OngoingProjects from "../components/OngoingProjects/OngoingProjects";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <hr />
      <Trending />
      <hr />
      <RecentlyAdded />
      <hr />
      <OngoingProjects />
      {/* <hr />
      <Footer /> */}
    </div>
  );
}
