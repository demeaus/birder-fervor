function List({ items, render }) {
  return <ul className="bg-zinc-100 divide-y-2">{items.map(render)}</ul>;
}

export default List;
