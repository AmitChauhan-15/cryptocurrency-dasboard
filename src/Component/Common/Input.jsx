import { useState } from "react";

function Input({ label, placeholder, type, max, variant = "default" }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);

    if (e.target.value > max) {
      setError(`Limit exceed`);
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-4 m-2">
      <label className="block text-xs font-medium text-gray-500 uppercase mb-1">
        {label}
      </label>
      {variant === "default" && (
        <input
          className={`border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md w-full py-2 px-3 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
      {variant === "search" && (
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            className="border rounded-md w-full py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default Input;
