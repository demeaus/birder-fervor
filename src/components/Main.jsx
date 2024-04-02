import { useParams } from "react-router-dom";
import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import Map from "./Map";
import Controls from "../ui/Controls";
import Observations from "./Observations";
import { useObservations } from "../hooks/useObservations";
import { useState } from "react";
import Header from "../ui/Header";

function Main() {
  const { regionCode: regionCodeURL } = useParams();

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
    <div>
      <Header />
      <Controls>
        <SelectRegion />
        {regionCodeURL && <SelectSpecies />}
      </Controls>
      <div className="h-screen sm:flex">
        <Map
          observations={observations}
          selectedPin={selectedPin}
          handleSelectPin={handleSelectPin}
        />
        <Observations
          selectedPin={selectedPin}
          handleSelectPin={handleSelectPin}
        />
      </div>
    </div>
  );
}

export default Main;
