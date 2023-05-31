import { useState } from "react";

const Dropdown = ({
  custClass = "",
  type = "default",
  placeholder,
  label,
  color = "default",
  options,
  setState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    let newSelectedValues = selectedValues.slice();

    if (type === "multiselect") {
      const valueIndex = selectedValues.indexOf(value);

      if (valueIndex === -1) {
        newSelectedValues.push(value);
      } else {
        newSelectedValues.splice(valueIndex, 1);
      }
    } else {
      newSelectedValues = [value];
      setIsOpen(false);
    }

    setSelectedValues(newSelectedValues);
    setState(newSelectedValues);
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

  return (
    <div className="relative flex items-center justify-between">
      <label className="block text-sm font-medium text-gray-700 mr-3">
        {label}
      </label>
      <div
        className={`w-full flex justify-center relative rounded-lg shadow-sm ${custClass} ${
          color === "dark" ? "bg-gray-100 border-2" : "bg-white"
        }  ${
          isOpen || selectedValues.length
            ? "border-blue-500"
            : "border-gray-300"
        } focus:border-blue-500`}
        onClick={toggleDropdown}
      >
        <div className="flex w-full items-center justify-between px-4 py-2 ">
          <div className="flex-grow truncate">{getSelectedValueText()}</div>
          <div className="ml-2">
            <i
              className={`fas fa-caret-down transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-full z-10 w-full py-1 mt-1 overflow-auto rounded-md shadow-lg max-h-60 bg-white">
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-3 text-gray-400 ${
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
