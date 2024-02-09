import React from "react";
import AdminSidebar from "components/RealtorAdmin/AdminSidebar";
import Main from "components/RealtorAdmin/Main";
import RealtorAdminProvider from "components/RealtorAdmin/RealtorAdminContext";

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
