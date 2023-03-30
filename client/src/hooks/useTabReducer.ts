import React, { useReducer } from "react";

// define type for tab
export type Tab =
  | "uploadproperty"
  | "properties"
  | "settings"
  | "pausedproperties"; 

type TabState = {
  selectedTab: Tab;
};

type TabAction = {
  type: "SELECT_TAB";
  payload: Tab;
};

// default selected tab
const initialState: TabState = {
  selectedTab: "properties", 
};

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case "SELECT_TAB":
      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
};

//Exports a custom hook to handle the sidebar state
export const useTabState = (): [Tab, React.Dispatch<TabAction>] => {
  const [{ selectedTab }, dispatch] = useReducer(tabReducer, initialState);
  return [selectedTab, dispatch];
};
