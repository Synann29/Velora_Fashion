import React, { useState, useRef, useEffect } from 'react';

/**
 * CustomSelect Component
 * A custom dropdown menu with rounded corners and smooth animations
 * @param {string} value - Currently selected option
 * @param {function} onChange - Callback when selection changes
 * @param {array} options - List of dropdown options
 * @param {string} label - Optional label displayed before the dropdown
 */
export default function CustomSelect({ value, onChange, options, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close dropdown when user clicks outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-2 shrink-0" ref={containerRef}>
            {/* Label text (if provided) */}
            {label && <span className="font-medium">{label}</span>}

            <div className="relative w-44">
                {/* Dropdown button with chevron icon */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border border-gray-200 rounded-2xl px-2.5 py-1.5 bg-white text-gray-700 font-medium cursor-pointer outline-none text-xs shadow-xs focus:border-[#8B6E59] transition-colors flex items-center justify-between"
                >
                    <span>{value}</span>
                    {/* Chevron rotates 180deg when dropdown is open */}
                    <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {/* Dropdown menu - shown only when isOpen is true */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 overflow-hidden">
                        {/* Map through options to create menu items */}
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${value === option
                                    ? 'bg-fashion-brown text-white'
                                    : 'text-gray-700 hover:bg-amber-50'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
