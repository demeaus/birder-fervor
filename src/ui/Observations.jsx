import { useParams } from "react-router-dom";
import { useObservations } from "../hooks/useObservations";
import ObservationItem from "../components/ObservationItem";
import SelectRegion from "../components/SelectRegion";
import SelectSpecies from "../components/SelectSpecies";
import Map from "../components/Map";
import Controls from "./Controls";
import List from "./List";
import { useState } from "react";

function Observations() {
  // console.log("rendering Observations");
  const { status, error, observations = [] } = useObservations();
  const { regionCode: regionCodeURL } = useParams();
  const [selectedPin, setSelectedPin] = useState(null);

  // if (!observations.length)
  //   return <div>TODO: Empty Message; no observations for selected species</div>;

  function handleSelectPin(pin) {
    if (pin.lat === selectedPin.lat && pin.lng === selectedPin.lng) return;
    setSelectedPin(pin);
  }

  return (
    <>
      <Controls>
        <SelectRegion />
        {regionCodeURL && <SelectSpecies />}
      </Controls>
      <Map pins={observations} selectedPin={selectedPin} />
      {observations.length && (
        <List
          items={observations}
          render={(obs) => (
            <ObservationItem
              key={`${obs.obsDt}-${obs.locId}`}
              obs={obs}
              selectedPin={selectedPin}
              onSelectPin={handleSelectPin}
            />
          )}
        />
      )}
    </>
  );
}

export default Observations;
