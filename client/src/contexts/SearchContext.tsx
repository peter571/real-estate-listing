import React, {
  ReducerWithoutAction,
  createContext,
  useContext,
  useReducer,
} from "react";
import useSearchReducer from "../hooks/useSearchReducer";

const SearchContext = createContext({} as SearchContextState);

export const useSearch = () => useContext(SearchContext);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useSearchReducer();

  return (
    <SearchContext.Provider value={{ data: state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
}
