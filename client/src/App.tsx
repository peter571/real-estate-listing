import React from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";

function App() {
  const location = useLocation()
  return (
    <div className="h-screen px-10">
      <div className="h-[20%]">
        <NavigationBar />
        {location.pathname === '/' && <SearchBar />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/password/recover/:id" element={<ResetPassword />} />
        <Route path="/password-reset" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
