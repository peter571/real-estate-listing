import React from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import RealtorsAgents from "./pages/RealtorsAgents";
import RealtorProperties from "./components/RealtorProperties/RealtorProperties";
import About from "./pages/About";
//import Blog from "./pages/Blog";
import RealtorAdmin from "./components/RealtorAdmin/RealtorAdmin";
import Favorites from "./pages/Favorites";
import Properties from "./pages/Properties";
import {
  ProtectedRoute,
  ProtectedRouteAdmin,
} from "./ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertySearch from "./components/PropertySearch/PropertySearch";
import Search from "./components/Search/Search";

function App() {
  const location = useLocation();

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
              <RealtorAdmin />
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
