import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getObservationsBySpecies } from "../services/apiEBird";

export function useObservations() {
  const { speciesCode: speciesCodeURL, regionCode: regionCodeURL } =
    useParams();
  const {
    status,
    data: observations,
    error,
  } = useQuery({ queryKey: ["observations", regionCodeURL, speciesCodeURL], queryFn: () => getObservationsBySpecies(regionCodeURL, speciesCodeURL), enabled: !!(regionCodeURL && speciesCodeURL) });

  return { status, error, observations };
}
