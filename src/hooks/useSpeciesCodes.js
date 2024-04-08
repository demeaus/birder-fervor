/**
 * useSpeciesCodes.js
 */
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetSpeciesCodesFunction } from "./useGetSpeciesCodesFunction";

export function useSpeciesCodes() {
  const { layer } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { params, speciesCodesFunction } = useGetSpeciesCodesFunction(layer, lat, lng);

  const {
    status,
    data: speciesCodes,
    error,
  } = useQuery({
    queryKey: ["speciesCodes", params],
    queryFn: () => speciesCodesFunction(params),
    // enabled: false,
    enabled: !!(params && speciesCodesFunction)
  });

  return { status, error, speciesCodes };
}
