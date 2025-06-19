import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export type Option = {
  id: string;
  label: string;
};

type Props = {
  value?: Option | null;
  onSelect: (option: Option) => void;
  onSearch: (query: string) => Promise<Option[]>;
  options: Option[];
  loading?: boolean;
  placeholder?: string;
};

export const SearchableSelect = ({
  value,
  onSelect,
  onSearch,
  options,
  loading = false,
  placeholder = "Select an option",
}: Props) => {
  const [query, setQuery] = useState(value?.label || "");
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setQuery(value?.label || "");
  }, [value]);

  // Close dropdown when clicking outside (including portal)
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, []);

  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMenuStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX + 8, // Nudge right by 8px for better alignment
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsLoading(true);
    onSearch(e.target.value).finally(() => setIsLoading(false));
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder={placeholder}
      />
      {isOpen &&
        wrapperRef.current &&
        ReactDOM.createPortal(
          <ul
            ref={menuRef}
            style={menuStyles}
            className="bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
          >
            {isLoading || loading ? (
              <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : options.length === 0 ? (
              <li className="px-4 py-2 text-gray-500">No results</li>
            ) : (
              options.map((option) => (
                <li
                  key={option.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>,
          document.body
        )}
    </div>
  );
};
