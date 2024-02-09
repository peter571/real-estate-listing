import React from "react";
import { Sidebar } from "flowbite-react";
import { FaSignOutAlt } from "react-icons/fa";
import { BsHouse, BsUpload, BsHouseFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { useRealtorAdminContext } from "components/RealtorAdmin/RealtorAdminContext";
import { useAuth } from "context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminSidebar() {
  const { handleTabClick, selectedTab } = useRealtorAdminContext();
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return (
    <div className="w-fit h-screen mt-16">
      <Sidebar aria-label="Sidebar content">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              role="button"
              className={selectedTab === "properties" && "bg-gray-300"}
              onClick={() => handleTabClick("properties")}
              icon={BsHouseFill}
            >
              All properties
            </Sidebar.Item>
            <Sidebar.Item
              role="button"
              className={selectedTab === "uploadproperty" && "bg-gray-300"}
              onClick={() => handleTabClick("uploadproperty")}
              icon={BsUpload}
            >
              Upload property
            </Sidebar.Item>

            <Sidebar.Item
              role="button"
              className={selectedTab === "pausedproperties" && "bg-gray-300"}
              onClick={() => handleTabClick("pausedproperties")}
              icon={BsHouse}
            >
              Paused properties
            </Sidebar.Item>
            <Sidebar.Item
              role="button"
              className={selectedTab === "settings" && "bg-gray-300"}
              onClick={() => handleTabClick("settings")}
              icon={FiSettings}
            >
              Settings
            </Sidebar.Item>
            <Sidebar.Item
              role="button"
              onClick={async () => {
                await logout().then(() => {
                  queryClient.clear();
                });
              }}
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
