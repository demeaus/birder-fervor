import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative z-20 w-full bg-gray-700 p-2">
      <Link
        className="text-2xl uppercase tracking-widest text-yellow-100"
        to="/"
      >
        Birder Fervor
      </Link>
    </header>
  );
}

export default Header;
