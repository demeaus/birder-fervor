import { useState } from "react";
import PanelToggle from "./PanelToggle";

function Controls({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div>
      {isOpen && (
        <div className="relative z-20 bg-zinc-100 px-4 py-2 text-sm">
          {/* TODO: Search for species by address*/}
          {children}
        </div>
      )}

      <div className="flex w-full justify-center">
        <PanelToggle type="up" onClick={handleToggle} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Controls;
