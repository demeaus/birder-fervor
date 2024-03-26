import { useState } from "react";
import Header from "./Header";
import List from "./List";
import Controls from "../components/Controls";
import ObservationItem from "../components/ObservationItem";
import { useObservations } from "../context/ObservationsContext";

function AppLayout() {
  const { observations } = useObservations();
  return (
    <div>
      <Header />
      <Controls />
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
