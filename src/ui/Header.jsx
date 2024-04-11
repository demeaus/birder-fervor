import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative z-20 w-full border-2 border-solid border-gray-400 bg-gray-700 p-2">
      <Link
        className="text-2xl uppercase tracking-widest text-yellow-400"
        to="/"
      >
        Birder Fervor
      </Link>
    </header>
  );
}

export default Header;
