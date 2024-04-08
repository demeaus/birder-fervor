import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getSpeciesCommonNames } from "../services/apiEBird";

export function useSpeciesCommonNames(speciesCodes) {
  const { layer } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const {
    status,
    data: speciesCommonNames,
    error,
  } = useQuery({ queryKey: ["speciesCommonNames", { layer, lat, lng }], queryFn: () => getSpeciesCommonNames(speciesCodes), enabled: !!(speciesCodes?.length) });

  return { status, error, speciesCommonNames };
}
