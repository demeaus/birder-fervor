import { useParams } from "react-router-dom";
import ObservationItem from "./ObservationItem";
import { useObservations } from "../hooks/useObservations";
import Loader from "../ui/Loader";

function Observations({ selectedPin, handleSelectPin }) {
  const { isLoading, error, observations } = useObservations();
  const { regionCode: regionCodeURL, speciesCode: speciesCodeURL } =
    useParams();

  // If there is no selected region or species, then no observations are to be shown
  if (!regionCodeURL || !speciesCodeURL) {
    return <div>Search away!</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  // If there are no observations for the selected species
  if (!observations?.length) {
    return (
      <div className="fixed z-10 w-full bg-zinc-200 px-6 py-3 text-center text-sm">
        No observations for the selected species in the last 30 days.
      </div>
    );
  }

  return (
    <ul className="fixed bottom-0 z-20 h-64 w-full divide-y-4 overflow-auto bg-zinc-50">
      {observations.map((obs) => (
        <ObservationItem
          key={`${obs.obsDt}-${obs.locId}`}
          obs={obs}
          selectedPin={selectedPin}
          onSelectPin={handleSelectPin}
        />
      ))}
    </ul>
  );
}

export default Observations;
