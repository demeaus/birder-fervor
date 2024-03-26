import List from "./List";
import ObservationItem from "../components/ObservationItem";
import { useObservations } from "../context/ObservationsContext";

function Observations() {
  const { observations } = useObservations();
  return (
    <div>
      {observations.length && (
        <>
          {/* <Map /> */}
          <List
            items={observations}
            render={(obs) => (
              <ObservationItem key={`${obs.obsDt}-${obs.locId}`} obs={obs} />
            )}
          />
        </>
      )}
    </div>
  );
}

export default Observations;
