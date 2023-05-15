import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTabState, Tab } from "../../hooks/useTabReducer";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getRealtorByUserId } from "../../api/realtors";

interface RealtorAdminProps {
  selectedTab: Tab;
  handleTabClick: (tab: Tab) => void;
}

const RealtorContext = createContext<RealtorAdminProps>(
  {} as RealtorAdminProps
);

export const useRealtorAdminContext = () => useContext(RealtorContext);

export default function RealtorAdminProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedTab, dispatch] = useTabState();
  const { currentUser } = useAuth();
  const { data } = useQuery({
    queryKey: ["realtor", currentUser?.uid],
    enabled: currentUser !== null,
    queryFn: () => getRealtorByUserId(currentUser.uid, currentUser.accessToken)
  })

  const handleTabClick = (tab: Tab) => {
    dispatch({ type: "SELECT_TAB", payload: tab });
  };

  return (
    <RealtorContext.Provider
      value={{ selectedTab, handleTabClick }}
    >
      {children}
    </RealtorContext.Provider>
  );
}
