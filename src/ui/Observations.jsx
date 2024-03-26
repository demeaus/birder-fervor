import List from "./List";
import ObservationItem from "../components/ObservationItem";
import { useObservations } from "../hooks/useObservations";
import { useParams } from "react-router-dom";

function Observations() {
  const { status, error, observations = [] } = useObservations();

  if (!observations.length)
    return <div>TODO: Empty Message; no observations for selected species</div>;

  return (
    <div>
      {/* <Map /> */}
      <List
        items={observations}
        render={(obs) => (
          <ObservationItem key={`${obs.obsDt}-${obs.locId}`} obs={obs} />
        )}
      />
    </div>
  );
}

export default Observations;
