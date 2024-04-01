import { useParams } from "react-router-dom";
import ObservationItem from "./ObservationItem";
import { useObservations } from "../hooks/useObservations";
import Loader from "../ui/Loader";
import PanelToggle from "../ui/PanelToggle";
import { useState } from "react";

function Observations({ selectedPin, handleSelectPin }) {
  const { isLoading, error, observations } = useObservations();
  const { regionCode: regionCodeURL, speciesCode: speciesCodeURL } =
    useParams();

  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

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
      <div className="fixed bottom-0 z-20 w-full bg-zinc-200 px-6 py-3 text-center text-sm">
        No observations for the selected species in the last 30 days.
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 z-20 w-full ">
      <div className="flex justify-center">
        <PanelToggle type="down" onClick={handleToggle} isOpen={isOpen} />
      </div>

      <div
        className={`h-64 overflow-auto bg-zinc-50${isOpen ? "" : " hidden"}`}
      >
        <h1 className="bg-zinc-200 px-4 pt-3 text-sm">
          TODO: Recent observations of {speciesCodeURL} in {regionCodeURL}
        </h1>
        <ul className="divide-y-4">
          {observations.map((obs) => (
            <ObservationItem
              key={`${obs.obsDt}-${obs.locId}`}
              obs={obs}
              selectedPin={selectedPin}
              onSelectPin={handleSelectPin}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Observations;
