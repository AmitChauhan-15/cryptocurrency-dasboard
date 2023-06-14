import React, { useState, useEffect } from "react";

const Dropdown = ({
  custClass = "",
  type = "default",
  placeholder,
  label,
  color = "default",
  options,
  defaultValue,
  handleChange,
  labelClass = "",
  optionPosition = "bottom",
  maxSelection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    let newSelectedValues = selectedValues.slice();

    if (type === "multiselect") {
      const valueIndex = selectedValues.indexOf(value);

      if (valueIndex === -1) {
        newSelectedValues.length < maxSelection &&
          newSelectedValues.push(value);
      } else {
        newSelectedValues.splice(valueIndex, 1);
      }
      newSelectedValues.length === 0 && newSelectedValues.push(defaultValue);
    } else {
      newSelectedValues = [value];
      setIsOpen(false);
    }

    setSelectedValues(newSelectedValues);

    if (handleChange && type === "multiselect") {
      handleChange(newSelectedValues);
    } else if (handleChange) {
      handleChange(...newSelectedValues);
    }
  };

  const getSelectedValueText = () => {
    if (selectedValues.length === 0) {
      return placeholder || "Select";
    }

    if (type === "multiselect") {
      if (selectedValues.length === 1) {
        return selectedValues[0];
      }

      return `${selectedValues}`;
    }

    return selectedValues[0];
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValues([defaultValue]);
      type === "default"
        ? handleChange(defaultValue)
        : handleChange([defaultValue]);
    }
    //eslint-disable-next-line
  }, [defaultValue]);

  return (
    <div className="relative flex items-center justify-start sm:justify-between">
      {label && (
        <label
          className={`block text-xs sm:text-sm font-medium mr-3 ${labelClass}`}
        >
          {label}
        </label>
      )}
      <div
        className={`flex justify-center relative rounded-lg shadow-sm ${custClass} ${
          color === "dark" ? "bg-gray-100 border-2" : "bg-white"
        }  ${
          isOpen || selectedValues.length
            ? "border-blue-500"
            : "border-gray-200"
        } focus:border-blue-500`}
        onClick={toggleDropdown}
      >
        <div className="flex max-w-full min-w-full items-center px-2 sm:px-4 py-1 sm:py-2 ">
          <div className="flex-grow text-xs sm:text-base truncate">
            {getSelectedValueText()}
          </div>
          <div className="ml-2">
            <i
              className={`fas fa-caret-down transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </div>
        </div>
        {isOpen && (
          <div
            className={`absolute z-10 w-full py-1 mt-1 overflow-auto rounded-md shadow-lg max-h-60 bg-white custom-scrollbar ${
              optionPosition === "top" ? "-top-44" : "top-full"
            }`}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={`text-xs sm:text-base px-4 py-3 mb-1 text-gray-400 ${
                  selectedValues.includes(option)
                    ? " text-gray-900 bg-red-100"
                    : ""
                } hover:bg-red-100 cursor-pointer`}
                onClick={() => handleSelect(option)}
                style={{ minHeight: "3rem" }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
