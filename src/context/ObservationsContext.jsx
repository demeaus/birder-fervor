import { createContext, useContext, useState } from "react";

const ObservationsContext = createContext();

function ObservationsProvider({ children }) {
  const [observations, setObservations] = useState([]);

  return (
    <ObservationsContext.Provider value={{ observations, setObservations }}>
      {children}
    </ObservationsContext.Provider>
  );
}

function useObservations() {
  const context = useContext(ObservationsContext);

  if (context === undefined) {
    throw new Error(
      "ObservationsContext was used outside of the ObservationsProvider"
    );
  }

  return context;
}

export { ObservationsProvider, useObservations };
