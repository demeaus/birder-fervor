// TODO: Handle styling when paneling is added

function Loader() {
  return (
    <div className="fixed flex h-full w-full items-center justify-center bg-zinc-200/20 backdrop-blur-sm">
      {/* <div className="absolute inset-0 flex items-center justify-center bg-zinc-200/20 backdrop-blur-sm"> */}
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
