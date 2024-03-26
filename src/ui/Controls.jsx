function Controls({ children }) {
  // console.log("rendering Controls");
  return (
    <div className="relative z-20 bg-zinc-100 px-4 py-4">
      {/* TODO: Search for species by address*/}
      {children}
    </div>
  );
}

export default Controls;
