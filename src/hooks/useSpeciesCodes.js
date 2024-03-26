import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSpeciesCodesByRegion } from "../services/apiEBird";

export function useSpeciesCodes() {
  const { regionCode: regionCodeURL } = useParams();
  const {
    isLoading,
    data: speciesCodes,
    error,
  } = useQuery({ queryKey: ["speciesCodes", regionCodeURL], queryFn: () => getSpeciesCodesByRegion(regionCodeURL), enabled: !!regionCodeURL });

  return { isLoading, error, speciesCodes };
}
