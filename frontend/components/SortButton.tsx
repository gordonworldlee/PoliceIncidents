import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface SortOption {
  id: string;
  label: string;
}

interface SortButtonProps {
  options: SortOption[];
  onSortChange: (option: string | null, direction: 'asc' | 'desc' | null) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ options, onSortChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
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

  const toggleSort = (optionId: string) => {
    if (activeSort === optionId) {
      // If already active, disable it
      setActiveSort(null);
      onSortChange(null, null);
    } else {
      // Activate this option
      setActiveSort(optionId);
      onSortChange(optionId, sortDirection);
    }
  };

  const toggleDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    if (activeSort) {
      onSortChange(activeSort, newDirection);
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center px-4 py-2 rounded-md border ${
          activeSort 
            ? 'bg-blue-50 border-blue-300 text-blue-700' 
            : 'bg-white border-gray-300 text-gray-700'
        } hover:bg-gray-50 transition-colors duration-200`}
      >
        {activeSort ? (
          <>
            <span className="mr-2">Sorting by: {options.find(opt => opt.id === activeSort)?.label}</span>
            {sortDirection === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
          </>
        ) : (
          <>
            <span>Sort</span>
            <FiChevronDown className="ml-2" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
            <span className="font-medium text-gray-700">Sort by</span>
          </div>
          <div className="py-2">
            {options.map((option) => (
              <div key={option.id} className="px-3 py-2 hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{option.label}</span>
                  <div className="flex items-center">
                    <button
                      className={`px-2 py-1 mr-2 text-xs font-medium rounded ${
                        activeSort === option.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => toggleSort(option.id)}
                    >
                      {activeSort === option.id ? 'Enabled' : 'Enable'}
                    </button>
                    
                    {activeSort === option.id && (
                      <button 
                        onClick={toggleDirection}
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
                      >
                        {sortDirection === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                      </button>
                    )}
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

export default SortButton;