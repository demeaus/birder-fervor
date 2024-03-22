import { useState } from "react";

import Header from "./ui/Header";
import Controls from "./Controls";
import Map from "./Map";
import List from "./List";
import ObservationItem from "./ObservationItem";

function App() {
  const [observations, setObservations] = useState([]);

  return (
    <div>
      <Header />
      <Controls setObservations={setObservations} />
      {observations.length && (
        <>
          <Map />
          <List
            items={observations}
            render={(obs) => <ObservationItem obs={obs} />}
          />
        </>
      )}
    </div>
  );
}

export default App;
