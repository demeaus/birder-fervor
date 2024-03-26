import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useEffect, useState } from "react";
import { getObservationsBySpecies } from "../services/apiEBird";
import { useParams } from "react-router-dom";
import { useObservations } from "../context/ObservationsContext";
import { useSpeciesCodes } from "../hooks/useSpeciesCodes";
import { useSpeciesCommonNames } from "../hooks/useSpeciesCommonNames";

function Controls() {
  console.log("rendering Controls");
  const [regionSpeciesList, setRegionSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const { regionCode: regionCodeURL } = useParams();
  const { observations, setObservations } = useObservations();
  console.log("regionSpeciesList len: ", regionSpeciesList.length);
  const {
    status: statusSpeciesCodes,
    error: errorSpeciesCodes,
    speciesCodes = [],
  } = useSpeciesCodes();
  const {
    status: statusSpeciesCommonNames,
    error: errorSpeciesCommonNames,
    speciesCommonNames = [],
  } = useSpeciesCommonNames(speciesCodes);

  // useEffect(() => {
  //   async function fetchObservations() {
  //     const obs = await getObservationsBySpecies(
  //       regionCodeURL,
  //       selectedSpecies
  //     );
  //     setObservations(obs);
  //   }

  //   if (!regionCodeURL || !selectedSpecies) {
  //     if (observations.length) {
  //       setObservations([]);
  //     }
  //     return;
  //   }

  //   if (selectedSpecies && regionCodeURL === selectedRegionCode) {
  //     console.log("fetching observations");
  //     fetchObservations();
  //   }
  // }, [
  //   selectedSpecies,
  //   selectedRegionCode,
  //   regionCodeURL,
  //   observations,
  //   setObservations,
  // ]);

  // Syncs list of species in the selected region with loaded species codes and species common names
  useEffect(() => {
    console.log(statusSpeciesCommonNames);
    if (statusSpeciesCommonNames === "success") {
      setRegionSpeciesList(
        speciesCommonNames.map((obj) => ({ value: obj[0], label: obj[1] }))
      );
    }
  }, [speciesCommonNames, statusSpeciesCommonNames]);

  return (
    <div className="bg-zinc-100 px-4 py-4 ">
      {/* TODO: Search for species by address*/}
      <SelectRegion
        selectedRegionCode={selectedRegionCode}
        setSelectedRegionCode={setSelectedRegionCode}
      />
      {/* Display species in regioncode */}
      {regionCodeURL && regionSpeciesList.length && (
        <SelectSpecies
          regionSpeciesList={regionSpeciesList}
          setSelectedSpecies={setSelectedSpecies}
        />
      )}
    </div>
  );
}

export default Controls;
