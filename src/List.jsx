function List({ items, render }) {
  return <ul className="bg-zinc-50 divide-y-4">{items.map(render)}</ul>;
}

export default List;
