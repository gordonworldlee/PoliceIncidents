import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

interface FilterButtonProps {
  label: string;
  options: string[];
  onFilterChange: (selectedOption: string | null) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, options, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    // If the option is already selected, deselect it
    const newSelection = selectedOption === option ? null : option;
    setSelectedOption(newSelection);
    onFilterChange(newSelection);
  };

  const clearFilter = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the dropdown toggle
    setSelectedOption(null);
    onFilterChange(null);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div 
        onClick={toggleDropdown}
        className={`flex items-center px-4 py-2 rounded-md border cursor-pointer ${
          selectedOption 
            ? 'bg-blue-50 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 text-gray-700'
        } hover:bg-gray-50 transition-colors duration-200`}
      >
        <FiFilter className="mr-2" />
        <span className="mr-2">
          {selectedOption
            ? `${label}: ${selectedOption}`
            : `Filter by ${label}`}
        </span>
        {selectedOption && (
          <span 
            onClick={clearFilter}
            className="ml-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-1 rounded cursor-pointer flex items-center justify-center"
          >
            <FiX size={14} />
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="px-2 py-2 border-b border-gray-200 bg-gray-50 sticky top-0">
            <span className="font-medium text-gray-700">{label}</span>
          </div>
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => selectOption(option)}
              >
                <span className="text-gray-700">{option}</span>
                <div className="relative">
                  <div 
                    className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                      selectedOption === option ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <div 
                      className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                        selectedOption === option ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;