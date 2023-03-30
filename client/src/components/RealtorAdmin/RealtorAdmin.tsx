import React from "react";
import AdminSidebar from "./AdminSidebar";
import Main from "./Main";
import RealtorAdminProvider from "./RealtorAdminContext";

export default function RealtorAdmin() {
  return (
    <RealtorAdminProvider>
      <div className="flex flex-row">
        <AdminSidebar />
        <Main />
      </div>
    </RealtorAdminProvider>
  );
}
