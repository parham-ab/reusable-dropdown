import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdDone } from "react-icons/md";
interface CustomDropdownProps {
  items: string[];
  placeholder?: string;
}
const CustomDropdown: React.FC<CustomDropdownProps> = ({
  items: initialItems,
  placeholder = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>(initialItems);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 18) {
      setInputValue(e.target.value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!items.includes(inputValue.trim()) && inputValue.trim()) {
        setItems([...items, inputValue.trim()]);
      } else {
        alert("Please enter a valid item.");
      }
      setInputValue("");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem || placeholder}</span>
        <IoIosArrowDown className={`arrow ${isOpen ? "open" : ""}`} />
      </div>
      {isOpen && (
        <ul className="dropdown-list" id="dropdown-list">
          <li className="dropdown-item input-item">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              className="dropdown-input"
            />
          </li>
          {items.map((item, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                selectedItem === item ? "selected" : ""
              }`}
              onClick={() => handleSelect(item)}
            >
              <span>{item}</span>
              {selectedItem === item && <MdDone className="check" size={18} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
