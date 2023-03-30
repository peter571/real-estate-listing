import { createContext, ReactNode, useContext } from "react";
import { useTabState, Tab } from "../../hooks/useTabReducer";

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

  const handleTabClick = (tab: Tab) => {
    dispatch({ type: "SELECT_TAB", payload: tab });
  };

  return (
    <RealtorContext.Provider value={{ selectedTab, handleTabClick }}>
      {children}
    </RealtorContext.Provider>
  );
}
