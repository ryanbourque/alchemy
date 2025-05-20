import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export type Option = {
  id: string;
  label: string;
};

type Props = {
  items: Option[];
  onSelect: (option: Option) => void;
};

export const Dropdown = ({ items, onSelect }: Props) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target as Node)
//       ) {
//         setTimeout(() => {
//           setIsOpen(false);
//         }, 200);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       setTimeout(() => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       }, 200);
//     };
//   }, []);

  // Simulate async fetch by filtering local items
  useEffect(() => {
    setFiltered(
      items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, items]);

  // Compute menu position and width when opening
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMenuStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
    setQuery(option.label);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Select an option"
      />
      {isOpen &&
        filtered.length > 0 &&
        wrapperRef.current &&
        ReactDOM.createPortal(
          <ul
            style={menuStyles}
            className="bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
          >
            {filtered.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};
