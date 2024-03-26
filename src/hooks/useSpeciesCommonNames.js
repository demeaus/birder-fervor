import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSpeciesCommonNames } from "../services/apiEBird";

export function useSpeciesCommonNames(speciesCodes) {
  const { regionCode: regionCodeURL } = useParams();
  const {
    status,
    data: speciesCommonNames,
    error,
  } = useQuery({ queryKey: ["speciesCommonNames", regionCodeURL], queryFn: () => getSpeciesCommonNames(speciesCodes), enabled: !!speciesCodes.length });

  return { status, error, speciesCommonNames };
}
