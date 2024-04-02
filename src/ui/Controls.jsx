import { useState } from "react";
import PanelToggle from "./PanelToggle";

function Controls({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="absolute z-20 w-full">
      <div
        className={`bg-zinc-100 px-4 pb-3 pt-2 text-sm sm:justify-stretch sm:gap-4 ${isOpen ? "sm:flex" : "hidden "}`}
      >
        {/* TODO: Search for species by address*/}
        {children}
      </div>

      <div className="flex justify-center">
        <PanelToggle type="up" onClick={handleToggle} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Controls;
