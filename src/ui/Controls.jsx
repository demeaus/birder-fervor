import { useState } from "react";
import PanelToggle from "./PanelToggle";

function Controls({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div>
      <div
        className={`absolute z-20 w-full bg-zinc-100 px-4 py-2 text-sm${isOpen ? "" : " hidden"}`}
      >
        {/* TODO: Search for species by address*/}
        {children}
      </div>

      <div className="absolute flex w-full justify-center">
        <PanelToggle type="up" onClick={handleToggle} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Controls;
