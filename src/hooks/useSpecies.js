/**
 * useSpeciesCodes.js
 */
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetSpeciesFunction } from "./useGetSpeciesFunction";

export function useSpecies() {
  const { layer } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { params, speciesFunction } = useGetSpeciesFunction(layer, lat, lng);

  const {
    status,
    data: species,
    error,
  } = useQuery({
    queryKey: ["species", params],
    queryFn: () => speciesFunction(params),
    enabled: !!(params && speciesFunction)
  });

  return { status, error, species };
}
