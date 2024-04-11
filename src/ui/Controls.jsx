import { useState } from "react";
import PanelToggle from "./PanelToggle";

function Controls({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="absolute z-20">
      <div
        className={`flex flex-col items-start gap-1 rounded-b-lg border-2 border-t-0 border-solid border-gray-400 bg-gray-700 px-4 pt-3 text-sm text-yellow-50 ${isOpen ? "" : "hidden "}`}
      >
        <h1 className="px-4 text-xs">
          Search for recent sightings by region and species:
        </h1>
        <div className="flex w-full max-w-sm flex-col items-start gap-1 px-4 pb-3 sm:left-0 sm:top-0 sm:min-w-fit sm:max-w-screen-lg sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          {children}
        </div>
      </div>

      <div
        className={`mt-1 flex justify-center ${isOpen ? "" : "mt-10 w-screen"}`}
      >
        <PanelToggle type="up" onClick={handleToggle} isOpen={isOpen} />
      </div>
    </div>
  );
}

export default Controls;
