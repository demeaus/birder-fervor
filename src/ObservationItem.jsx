function ObervationItem({ obs }) {
  return (
    <li>
      <p>{obs.obsDt}</p>
      <p>{obs.howMany}</p>
      <p>{obs.locName}</p>
      <p>{obs.lat}</p>
      <p>{obs.lng}</p>
    </li>
  );
}

export default ObervationItem;
