import React, { useState, useRef, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FiCheck } from 'react-icons/fi';

interface FilterButtonProps {
  label: string;
  options: string[];
  onFilterChange: (selectedOptions: string[]) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, options, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

  const toggleOption = (option: string) => {
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(updatedSelection);
    onFilterChange(updatedSelection);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center px-4 py-2 rounded-md border ${
          selectedOptions.length > 0 
            ? 'bg-blue-50 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 text-gray-700'
        } hover:bg-gray-50 transition-colors duration-200`}
      >
        <FiFilter className="mr-2" />
        <span>
          {selectedOptions.length > 0
            ? `${label}: ${selectedOptions.length} selected`
            : `Filter by ${label}`}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="px-2 py-2 border-b border-gray-200 bg-gray-50 sticky top-0">
            <span className="font-medium text-gray-700">{label}</span>
          </div>
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <div className={`w-5 h-5 mr-3 flex items-center justify-center rounded border ${
                  selectedOptions.includes(option)
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedOptions.includes(option) && <FiCheck size={14} />}
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;