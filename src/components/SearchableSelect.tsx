import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export interface Option {
  id: string;
  label: string;
}

export interface SearchableSelectProps {
  /** List of options to search through */
  items: Option[];
  /** Callback when an option is selected */
  onSelect: (option: Option) => void;
  /** Placeholder text for the input */
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ items, onSelect, placeholder }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Simulate async fetch by filtering local items
  useEffect(() => {
    const results = items
      .filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFiltered(results);
  }, [query, items]);

  // Compute portal menu position on open
  useEffect(() => {
    if (isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMenuStyles({
        position: 'absolute',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999
      });
    }
  }, [isOpen]);

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={e => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filtered.length > 0 && wrapperRef.current &&
        ReactDOM.createPortal(
          <ul style={menuStyles} className="bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
            {filtered.map(option => (
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

export default SearchableSelect;
