import React, { useEffect, useState } from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "components/Auth/Auth";
import ResetPassword from "components/Auth/ResetPassword";
import ForgotPassword from "components/Auth/ForgotPassword";
import RealtorsAgents from "pages/RealtorsAgents";
import RealtorProperties from "components/RealtorProperties/RealtorProperties";
import RealtorAdmin from "components/RealtorAdmin/RealtorAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertySearch from "components/PropertySearch/PropertySearch";
import Search from "components/Search/Search";
import PropertyPage from "components/PropertyPage/PropertyPage";
import About from "pages/About";
import Favorites from "pages/Favorites";
import Properties from "pages/Properties";
import Home from "pages/Home";
import {
  ProtectedRouteAdmin,
} from "@/ProtectedRoute/ProtectedRoute";


function App() {
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" min-h-screen scroll-smooth px-3 sm:px-10 relative">
      <ToastContainer />
      <div className="w-full bg-gray-400">
        <NavigationBar />
        <div className="flex justify-center w-full fixed top-16 z-10 bg-white left-0 -mt-1 pb-3">
          {location.pathname === "/all-properties" && <Search />}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/real-estate-agents" element={<RealtorsAgents />} />
        <Route path="/real-estate-agents/:id" element={<RealtorProperties />} />
        <Route path="/property/:id" element={<PropertyPage />} />
        {/* <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} /> */}
        <Route path="/password/recover/:id" element={<ResetPassword />} />
        <Route path="/password-reset" element={<ForgotPassword />} />
        <Route
          path="/search-properties/:search_query"
          element={<PropertySearch />}
        />
        <Route
          path="/realtor-admin"
          element={
            <ProtectedRouteAdmin>
              {screenWidth >= 1024 ? (
                <RealtorAdmin />
              ) : (
                <h1 className="top-28 fixed font-semibold">
                  You can only view this page on bigger screen!
                </h1>
              )}
            </ProtectedRouteAdmin>
          }
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/all-properties" element={<Properties />} />
      </Routes>
    </div>
  );
}

export default App;
