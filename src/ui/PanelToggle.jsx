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

const base = "text-3xl z-20 relative text-slate-800";

const styles = {
  up: base + "",
  down: base + "",
};

function PanelToggle({ type, onClick, isOpen }) {
  return (
    <button className={styles[type]} onClick={onClick}>
      {type === "up" && (isOpen ? <LuChevronUp /> : <LuChevronDown />)}
      {type === "down" && (isOpen ? <LuChevronDown /> : <LuChevronUp />)}
      {type === "left" && (isOpen ? <LuChevronLeft /> : <LuChevronRight />)}
      {type === "right" && (isOpen ? <LuChevronRight /> : <LuChevronLeft />)}
    </button>
  );
}

export default PanelToggle;
