import { useState } from "react";
import PanelToggle from "./PanelToggle";

function Controls({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="absolute z-20 flex w-full flex-col items-center sm:w-fit">
      <div
        className={`rounded-b-lg border-4 border-t-0 border-solid border-gray-400 bg-gray-200 px-4 py-3 text-sm sm:left-0 sm:top-0 sm:min-w-fit sm:items-center sm:justify-center sm:gap-4 sm:px-12 sm:py-4 ${isOpen ? "sm:flex" : "hidden "}`}
      >
        {/* TODO: Search for species by address*/}
        {children}
      </div>

      <div className={`mt-1 flex justify-center ${isOpen ? "" : "w-screen"}`}>
        <PanelToggle type="up" onClick={handleToggle} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Controls;
