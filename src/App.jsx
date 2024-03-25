import { useState } from "react";

import Header from "./ui/Header";
import Controls from "./Controls";
import Map from "./Map";
import List from "./List";
import ObservationItem from "./ObservationItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

function App() {
  const [observations, setObservations] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
