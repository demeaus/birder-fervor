import { Link } from "react-router-dom";
import { useLocationContext } from "../context/LocationContext";

function Header() {
  const { handleLocationClear } = useLocationContext();
  return (
    <header className="relative z-20 w-full border-2 border-solid border-gray-400 bg-gray-700 p-2 lg:px-6 lg:py-4 ">
      <Link
        className="text-xl uppercase tracking-widest text-yellow-400 lg:text-2xl"
        to="/"
        state={{ clear: true }}
        onClick={handleLocationClear}
      >
        Birder Fervor
      </Link>
    </header>
  );
}

export default Header;
