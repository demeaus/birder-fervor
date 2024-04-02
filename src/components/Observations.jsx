import { useParams } from "react-router-dom";
import ObservationItem from "./ObservationItem";
import { useObservations } from "../hooks/useObservations";
import Loader from "../ui/Loader";
import PanelToggle from "../ui/PanelToggle";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

function Observations({ selectedPin, handleSelectPin }) {
  const { isLoading, error, observations } = useObservations();
  const { regionCode: regionCodeURL, speciesCode: speciesCodeURL } =
    useParams();
  const { height, width } = useWindowDimensions();

  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  // If there is no selected region or species, then no observations are to be shown
  if (!regionCodeURL || !speciesCodeURL) {
    return;
    // (
    //   <div className="fixed bottom-0 z-20 w-full bg-zinc-200 px-6 py-3 text-center text-sm">
    //     Search away!
    //   </div>
    // );
  }

  if (isLoading) {
    return <Loader />;
  }

  // If there are no observations for the selected species
  if (regionCodeURL && speciesCodeURL && !observations?.length) {
    return (
      <div className="fixed bottom-0 z-20 w-full bg-gray-300 px-6 py-3 text-center text-sm">
        No observations for the selected species in the last 30 days.
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 z-10 flex w-full flex-col items-center lg:flex-row lg:justify-end">
      <div
        className={`mb-1 flex justify-center ${isOpen ? "lg:mb-0 lg:mr-1 " : "lg:fixed lg:top-1/2"}`}
      >
        <PanelToggle
          type={`${width >= 1024 ? "right" : "down"}`}
          onClick={handleToggle}
          isOpen={isOpen}
        />
      </div>

      <div
        className={`relative h-64 overflow-auto rounded-t-lg border-l-4 border-t-4 border-solid border-gray-400 lg:h-fit lg:max-h-[70vh] lg:rounded-l-lg ${isOpen ? "" : "hidden"}`}
      >
        <h1 className="sticky top-0 w-full bg-gray-400 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm">
          TODO: Recent observations of {speciesCodeURL} in {regionCodeURL}
        </h1>
        <ul className="divide-y-4 divide-gray-400">
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
