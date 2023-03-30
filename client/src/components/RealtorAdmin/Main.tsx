import React from "react";
import PausedProperties from "./PausedProperties";
import { useRealtorAdminContext } from "./RealtorAdminContext";
import RealtorProperties from "./RealtorProperties";
import Settings from "./Settings";
import UploadProperty from "./UploadProperty";

export default function Main() {
  const { selectedTab } = useRealtorAdminContext();
  return (
    <section className="w-full overflow-y-auto h-screen scrollbar-hide">
      {selectedTab === "properties" && <RealtorProperties />}
      {selectedTab === "uploadproperty" && <UploadProperty />}
      {selectedTab === "pausedproperties" && <PausedProperties />}
      {selectedTab === "settings" && <Settings />}
    </section>
  );
}
