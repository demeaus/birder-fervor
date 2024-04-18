import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { locationCleared } from "../features/controls/controlSlice";

function Header() {
  const dispatch = useDispatch();
  return (
    <header className="relative z-20 w-full border-2 border-solid border-gray-400 bg-gray-700 p-2 lg:px-6 lg:py-4 ">
      <Link
        className="text-xl uppercase tracking-widest text-yellow-400 lg:text-2xl"
        to="/"
        state={{ clear: true }}
        onClick={dispatch(locationCleared())}
      >
        Birder Fervor
      </Link>
    </header>
  );
}

export default Header;
