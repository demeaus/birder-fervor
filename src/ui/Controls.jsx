import { useState } from "react";
import PanelToggle from "./PanelToggle";

function Controls({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="absolute z-20 flex w-full flex-col items-center">
      <div
        className={`rounded bg-zinc-100 p-5 text-sm sm:w-fit sm:max-w-2xl sm:justify-stretch sm:gap-4 sm:px-6 sm:py-4 ${isOpen ? "sm:flex" : "hidden "}`}
      >
        {/* TODO: Search for species by address*/}
        {children}
      </div>

      <div className="mt-2 flex justify-center">
        <PanelToggle type="up" onClick={handleToggle} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Controls;
