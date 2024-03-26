function List({ items, render }) {
  return (
    <ul className="fixed bottom-0 z-20 h-64 w-full divide-y-4 overflow-auto bg-zinc-50">
      {items.map(render)}
    </ul>
  );
}

export default List;
