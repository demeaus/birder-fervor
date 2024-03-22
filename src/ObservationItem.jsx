function ObervationItem({ obs }) {
  // distance from user's current/entered locations, if chosen
  // type of location (from geoapify and obs.locationPrivate)
  // starred for user for sorting and export
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
