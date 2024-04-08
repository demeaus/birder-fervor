import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSpeciesObservationsByRegion } from "../services/apiEBird";

export function useObservations() {
  const { speciesCode: speciesCodeURL, regionCode: regionCodeURL } =
    useParams();
  const {
    isLoading,
    data: observations,
    error,
  } = useQuery({
    queryKey: ["observations", regionCodeURL, speciesCodeURL],
    queryFn: () => getSpeciesObservationsByRegion(regionCodeURL, speciesCodeURL),
    enabled: !!(regionCodeURL && speciesCodeURL)
  });

  return { isLoading, error, observations };
}
