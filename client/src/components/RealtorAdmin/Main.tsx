import React from "react";
import PausedProperties from "components/RealtorAdmin/PausedProperties";
import { useRealtorAdminContext } from "components/RealtorAdmin/RealtorAdminContext";
import RealtorProperties from "components/RealtorAdmin/RealtorProperties";
import Settings from "components/RealtorAdmin/Settings";
import UploadProperty from "components/RealtorAdmin/UploadProperty";

export default function Main() {
  const { selectedTab } = useRealtorAdminContext();
  return (
    <section className="w-full overflow-y-auto h-screen scrollbar-hide mt-16">
      {selectedTab === "properties" && <RealtorProperties />}
      {selectedTab === "uploadproperty" && <UploadProperty />}
      {selectedTab === "pausedproperties" && <PausedProperties />}
      {selectedTab === "settings" && <Settings />}
    </section>
  );
}
