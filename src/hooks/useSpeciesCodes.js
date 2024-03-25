import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSpeciesCodesByRegion } from "../services/apiEBird";

export function useSpeciesCodes() {
  const { regionCode } = useParams();
  const {
    isLoading,
    data: speciesCodes,
    error,
  } = useQuery({ queryKey: ["speciesCodes", regionCode], queryFn: () => getSpeciesCodesByRegion(regionCode), enabled: !!regionCode });

  return { isLoading, error, speciesCodes };
}
