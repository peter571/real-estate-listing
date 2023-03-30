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
import Blog from "./pages/Blog";
import RealtorAdmin from "./components/RealtorAdmin/RealtorAdmin";

function App() {
  const location = useLocation();
  return (
    <div className="px-3 sm:px-10 bg-bodycolor min-h-screen">
      <div className="">
        <NavigationBar />
        {/* {location.pathname === '/' && <SearchBar />} */}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/real-estate-agents" element={<RealtorsAgents />} />
        <Route path="/real-estate-agents/:id" element={<RealtorProperties />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/password/recover/:id" element={<ResetPassword />} />
        <Route path="/password-reset" element={<ForgotPassword />} />
        <Route path="/realtor-admin" element={<RealtorAdmin />} />
        
      </Routes>
    </div>
  );
}

export default App;
