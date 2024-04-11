/**
 * Reuse: styling, certian amount above or below panel
 * Custom: Up or down, related panel
 * type: the direction of the chevron when the panel is open
 */

import {
  LuChevronDown,
  LuChevronUp,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

function PanelToggle({ type, onClick, isOpen }) {
  return (
    <button
      className="relative z-20 text-3xl text-yellow-800 sm:text-4xl"
      onClick={onClick}
    >
      {type === "up" && (isOpen ? <LuChevronUp /> : <LuChevronDown />)}
      {type === "down" && (isOpen ? <LuChevronDown /> : <LuChevronUp />)}
      {type === "left" && (isOpen ? <LuChevronLeft /> : <LuChevronRight />)}
      {type === "right" && (isOpen ? <LuChevronRight /> : <LuChevronLeft />)}
    </button>
  );
}

export default PanelToggle;
