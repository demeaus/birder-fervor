function Tooltip({ children }) {
  return (
    <span className="tooltip absolute bottom-full left-1/2 mb-0.5 -translate-x-1/2 transform">
      {children}
    </span>
  );
}

export default Tooltip;
