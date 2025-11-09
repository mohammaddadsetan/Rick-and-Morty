import { ChevronDownIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
interface optionProps {
  value: string;
  label: string;
}
interface InputProps {
  options: optionProps[];
  label: string;
  fullSelect?: boolean;
}
export default function Input({ options, label, fullSelect }: InputProps) {
  const optionsValues: optionProps[] = options;
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const buttonHeight = buttonRef.current.clientHeight;
      setDropHeight(buttonHeight + 4);
    }
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(label);
  const [dropHeight, setDropHeight] = React.useState<number | undefined>(20);
  return (
    <div
      className={` flex flex-col gap-1 items-end relative transition-all duration-200 ${
        fullSelect ? "w-full" : "w-fit"
      }`}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 p-2 rounded-lg bg-white text-black  cursor-pointer ${
          fullSelect && "w-full"
        }`}>
        {selectedOption}
        <ChevronDownIcon
          size={20}
          className={`transition-all duration-100 ${
            isOpen ? " rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul
          style={{ top: `${dropHeight}px` }}
          className={`w-full max-w-[200px] bg-white text-black rounded-lg p-1 space-y-1 transition-all duration-300 absolute   z-20 cursor-pointer`}>
          <li
            className="w-full p-1 hover:bg-amber-100 rounded-md "
            onClick={() => {
              setSelectedOption("none");
              setIsOpen(false);
            }}>
            none
          </li>
          {optionsValues.map((option) => (
            <li
              className="w-full p-1 hover:bg-amber-100 rounded-md "
              key={option.value}
              onClick={() => {
                setSelectedOption(option.label);
                setIsOpen(false);
              }}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
