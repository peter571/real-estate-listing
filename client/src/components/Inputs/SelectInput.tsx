import React from "react";

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
  return (
    <select
      id="countries"
      className="bg-[#f3f3f3] border-0 text-gray-900 text-sm font-semibold rounded-lg focus:ring-0 block w-full p-2 cursor-pointer"
      name={queryName}
      placeholder={placeholder}
    >
      <option className="text-[#161616] text-sm font-semibold" value="">
        {placeholder}
      </option>
      {items.length > 0 &&
        items.map((el, idx) => <option className="text-[#161616]" key={idx} value={el.value}>{el.name}</option>)}
    </select>
  );
}
