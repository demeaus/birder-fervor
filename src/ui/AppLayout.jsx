import { useState } from "react";
import Header from "./Header";
import List from "./List";
import Controls from "../components/Controls";
import ObservationItem from "../components/ObservationItem";

function AppLayout() {
  const [observations, setObservations] = useState([]);
  return (
    <div>
      <Header />
      <Controls setObservations={setObservations} />
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

export default AppLayout;
