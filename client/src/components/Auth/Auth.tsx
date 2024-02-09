import React, { useState } from "react";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";

export default function Auth() {
  const [show, setShowLogin] = useState(true);

  return (
    <div className="flex justify-center align-middle items-center h-screen">
      {show ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <Register setShowLogin={setShowLogin} />
      )}
    </div>
  );
}
