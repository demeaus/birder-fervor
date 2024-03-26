import { useParams } from "react-router-dom";
import { useObservations } from "../hooks/useObservations";
import ObservationItem from "../components/ObservationItem";
import SelectRegion from "../components/SelectRegion";
import SelectSpecies from "../components/SelectSpecies";
import Map from "../components/Map";
import Controls from "./Controls";
import List from "./List";

function Observations() {
  // console.log("rendering Observations");
  const { status, error, observations = [] } = useObservations();
  const { regionCode: regionCodeURL } = useParams();

  // if (!observations.length)
  //   return <div>TODO: Empty Message; no observations for selected species</div>;

  return (
    <>
      <Controls>
        <SelectRegion />
        {regionCodeURL && <SelectSpecies />}
      </Controls>
      <Map pins={observations} />
      <List
        items={observations}
        render={(obs) => (
          <ObservationItem key={`${obs.obsDt}-${obs.locId}`} obs={obs} />
        )}
      />
    </>
  );
}

export default Observations;
