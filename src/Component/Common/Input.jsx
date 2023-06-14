import { useState } from "react";

function Input({
  label,
  placeholder,
  type,
  max,
  variant = "default",
  custClass = "",
  setState = "",
  state,
  search,
}) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (max && Number(e.target.value) > Number(max)) {
      setError(`Limit exceed`);
    } else {
      setError("");
      setState(e.target.value);
    }
  };

  return (
    <div className={`w-full relative ${custClass}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-500 uppercase">
          {label}
        </label>
      )}
      {variant === "default" && (
        <input
          className={`border pt-2 sm:pt-3 pb- ${
            error ? "border-red-500 focus:border-red-500" : "border-gray-300"
          } rounded-md w-full py-1 sm:py-2 px-1 sm:px-3 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500`}
          type={type}
          placeholder={placeholder}
          value={state}
          onChange={handleChange}
        />
      )}
      {variant === "search" && (
        <div className="relative w-full">
          <input
            className="rounded-md w-full py-4 pl-5 sm:pl-10 pr-3 text-xs sm:text-base placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder={placeholder}
            value={state}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && search(state)}
          />
          <div
            className="absolute inset-y-0 right-5 sm:right-10 pl-3 flex items-center cursor-pointer"
            onClick={() => search(state)}
          >
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      )}
      {error && (
        <p className="absolute top-full text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

export default Input;
