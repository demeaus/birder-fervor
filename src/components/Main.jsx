import Map from "../features/observation/Map";
import Controls from "../ui/Controls";
import Observations from "../features/observation/Observations";
import { useObservations } from "../hooks/useObservations";
import { useState } from "react";
import SelectLocation from "../features/controls/SelectLocation";
import SelectSpecies from "../features/controls/SelectSpecies";
import { useParams } from "react-router-dom";

function Main() {
  const { layer } = useParams();
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
        <Controls>
          <SelectLocation />
          {layer && <SelectSpecies />}
        </Controls>
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
