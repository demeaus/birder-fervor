import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getAddressbyCoordinates } from "../services/apiRadar";
import { getSpeciesCodesByAddress, getSpeciesCodesByRegion } from "../services/apiEBird";




export function useSpeciesCodes({ params, speciesCodesFunction }) {

  const {
    status,
    data: speciesCodes,
    error,
  } = useQuery({ queryKey: ["speciesCodes", params], queryFn: () => speciesCodesFunction(params), enabled: !!(params && speciesCodesFunction) });

  return { status, error, speciesCodes };
}
