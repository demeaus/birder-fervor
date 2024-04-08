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
    <div className="fixed bottom-0 z-10 lg:right-0">
      <div className="flex flex-col lg:flex-row">
        <div
          className={`mb-1 flex justify-center lg:mb-0 lg:mr-1 ${isOpen ? "" : "mb-10 lg:fixed lg:right-10 lg:top-1/2"}`}
        >
          <PanelToggle
            type={`${width >= 1024 ? "right" : "down"}`}
            onClick={handleToggle}
            isOpen={isOpen}
          />
        </div>

        <div
          className={`lg:border-r-none lg:border-b-none relative max-h-[33vh] min-h-fit overflow-auto rounded-t-lg border-4 border-t-4 border-solid border-gray-400 lg:max-h-[80vh] lg:rounded-l-lg ${isOpen ? "" : "hidden"}`}
        >
          {/* <h1 className="sticky top-0 w-full bg-gray-400 px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm">
          TODO: Recent observations of {speciesCodeURL} in {regionCodeURL}
        </h1> */}
          <ul className="divide-y-4 divide-gray-400">
            {observations.map((obs, idx) => (
              <ObservationItem
                key={`${obs.obsDt}-${obs.locId}`}
                idx={idx}
                obs={obs}
                onSelectPin={handleSelectPin}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Observations;
