import React from "react";
import { Sidebar } from "flowbite-react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsHouse, BsUpload, BsHouseFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useRealtorAdminContext } from "./RealtorAdminContext";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminSidebar() {
  const { handleTabClick } = useRealtorAdminContext();
  const { logout } = useAuth();

  return (
    <div className="w-fit h-screen">
      <Sidebar aria-label="Sidebar content">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              role="button"
              onClick={() => handleTabClick("properties")}
              icon={BsHouseFill}
            >
              All properties
            </Sidebar.Item>
            <Sidebar.Item
              role="button"
              onClick={() => handleTabClick("uploadproperty")}
              icon={BsUpload}
            >
              Upload property
            </Sidebar.Item>

            <Sidebar.Item
              role="button"
              onClick={() => handleTabClick("pausedproperties")}
              icon={BsHouse}
            >
              Paused properties
            </Sidebar.Item>
            <Sidebar.Item
              role="button"
              onClick={() => handleTabClick("settings")}
              icon={FiSettings}
            >
              Settings
            </Sidebar.Item>
            <Sidebar.Item
              role="button"
              onClick={() => logout()}
              icon={FaSignOutAlt}
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
