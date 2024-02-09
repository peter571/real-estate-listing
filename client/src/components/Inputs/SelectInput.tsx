import React from "react";
import { useSearch } from "context/SearchContext";
import { initialState } from "hooks/useSearchReducer";

interface OptionProp {
  name: string;
  value: string;
}

interface SelectInputProps {
  items: OptionProp[];
  placeholder: string;
  queryName: string;
}

export default function SelectInput({
  items,
  placeholder,
  queryName,
}: SelectInputProps) {
  const { data, dispatch } = useSearch();

  const getSelectedValue = () => {
    switch (queryName) {
      case "type":
        return data.type;
      case "category":
        return data.category;
      case "bathsMin":
        return data.baths;
      case "roomsMin":
        return data.beds;
      case "minPrice":
        return data.min_price;
      case "maxPrice":
        return data.max_price;
      case "areaMax":
        return data.area_max;
      case "Reset":
        return "";
      default:
        return "";
    }
  };

  return (
    <select
      className="bg-[#f3f3f3] border-0 text-gray-900 text-sm font-semibold rounded-lg focus:ring-0 block w-full p-2 cursor-pointer"
      name={queryName}
      placeholder={placeholder}
      onChange={(e) => {
        switch (queryName) {
          case "type":
            dispatch({ type: "Type", payload: e.target.value });
            break;
          case "category":
            dispatch({ type: "Category", payload: e.target.value });
            break;
          case "bathsMin":
            dispatch({ type: "Baths", payload: e.target.value });
            break;
          case "roomsMin":
            dispatch({ type: "Beds", payload: e.target.value });
            break;
          case "minPrice":
            dispatch({ type: "MinPrice", payload: e.target.value });
            break;
          case "maxPrice":
            dispatch({ type: "MaxPrice", payload: e.target.value });
            break;
          case "areaMax":
            dispatch({ type: "AreaMax", payload: e.target.value });
            break;
          case "Reset":
            return { ...initialState, search_term: data.search_term };
          default:
            break;
        }
      }}
      value={getSelectedValue()}
    >
      <option className="text-[#161616] text-sm font-semibold" value="">
        {placeholder}
      </option>
      {items.length > 0 &&
        items.map((el, idx) => (
          <option className="text-[#161616]" key={idx} value={el.value}>
            {el.name}
          </option>
        ))}
    </select>
  );
}
