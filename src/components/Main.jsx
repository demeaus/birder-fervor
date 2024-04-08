import { useParams } from "react-router-dom";
import SelectLocation from "./SelectLocation";
import SelectSpecies from "./SelectSpecies";
import Map from "./Map";
import Controls from "../ui/Controls";
import Observations from "./Observations";
import { useObservations } from "../hooks/useObservations";
import { useState } from "react";

function Main() {
  const { isLoading, error, observations = [] } = useObservations();

  const [selectedPin, setSelectedPin] = useState(null);

  function handleSelectPin(pin) {
    if (!selectedPin) {
      setSelectedPin(pin);
    } else if (pin.lat === selectedPin.lat && pin.lng === selectedPin.lng) {
      return;
    } else {
      setSelectedPin(pin);
    }
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center lg:static lg:flex-none lg:items-start">
        <Controls />
        <Observations
          selectedPin={selectedPin}
          handleSelectPin={handleSelectPin}
        />
      </div>
      <Map
        observations={observations}
        selectedPin={selectedPin}
        handleSelectPin={handleSelectPin}
      />
    </div>
  );
}

export default Main;
