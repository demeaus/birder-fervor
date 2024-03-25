import { LuClipboardCopy } from "react-icons/lu";

function ButtonCopy({ handleClick }) {
  return (
    <button
      className="py-1 px-2 rounded bg-zinc-300 flex items-center gap-1 max-w-fit text-xs"
      onClick={handleClick}
    >
      <LuClipboardCopy />
      Copy
    </button>
  );
}

export default ButtonCopy;
