import { useReducer } from "react";

type State = {
  type: string;
  category: string;
  baths: number;
  beds: number;
  min_price: number;
  max_price: number;
  search_term: string;
};

const initialState: SearchProps = {
  type: "",
  category: "",
  baths: 0,
  beds: 0,
  min_price: 0,
  max_price: 0,
  search_term: "",
  area_max: 0,
};

function reducer(state: SearchProps, action: SearchAction): SearchProps {
  switch (action.type) {
    case "Type":
      return { ...state, type: action.payload };
    case "Category":
      return { ...state, category: action.payload };
    case "SearchTerm":
      return { ...state, search_term: action.payload };
    case "Baths":
      return { ...state, baths: action.payload };
    case "Beds":
      return { ...state, beds: action.payload };
    case "MinPrice":
      return { ...state, min_price: action.payload };
    case "MaxPrice":
      return { ...state, max_price: action.payload };
    case "AreaMax":
      return { ...state, area_max: action.payload };
    default:
      return state;
  }
}

function useSearchReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
}

export default useSearchReducer;
