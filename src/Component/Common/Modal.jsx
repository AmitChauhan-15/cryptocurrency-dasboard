import { useState } from "react";

const Modal = ({ header, children, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-25 z-40 cursor-pointer"
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 left-0 w-screen h-full flex items-center justify-center z-50 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        <div className="absolute w-4/5 lg:w-3/5 xl:w-2/5 bg-white rounded-lg shadow-lg overflow-y-auto">
          <div className="flex justify-between items-center bg-gray-200 px-4 py-5">
            <h2 className="text-xl font-bold">{header}</h2>
            <button
              onClick={handleClose}
              className="mt-1 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <i className="fas fa-times fa-lg" />
            </button>
          </div>
          <div className="min-h-80 max-h-96 overflow-y-auto px-4 py-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
