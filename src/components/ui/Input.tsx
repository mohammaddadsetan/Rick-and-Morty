import { Search } from "lucide-react";
import React, { useState } from "react";
interface inputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  width?: string;
}
export default function Input({ placeholder, onChange, width }: inputProps) {
  const [value, setValue] = useState<string>("");
  return (
    <div
      className={`bg-white text-black  px-2 py-2 rounded-lg relative`}
      style={{ width: width || "100%" }}>
      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="size-full text-lg pl-7"
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
}
