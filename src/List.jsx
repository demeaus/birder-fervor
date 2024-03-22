function List({ items, render }) {
  return <ul className="bg-red-300">{items.map(render)}</ul>;
}

export default List;
