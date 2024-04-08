/**
 * useSpeciesCodes.js
 */
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getRecentSpeciesByAddress, getRecentSpeciesByRegion } from "../services/apiEBird";
import { useAddress } from "./useAddress";

export function useSpecies() {
  const { layer } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { isLoading, error: errorAddress, address = {} } = useAddress();

  let params, speciesFunction;
  if (layer === 'state') {
    params = `${address?.countryCode}-${address?.stateCode}`;
    speciesFunction = getRecentSpeciesByRegion;

  } else if (layer === 'country') {
    params = address?.countryCode;
    speciesFunction = getRecentSpeciesByRegion;

  } else {
    //TODO: make radius variable
    const radius = 25;
    params = { lat, lng, radius };
    speciesFunction = getRecentSpeciesByAddress;
  }

  const {
    status,
    data: species,
    error,
  } = useQuery({
    queryKey: ["species", params],
    queryFn: () => speciesFunction(params),
    enabled: !!(params && speciesFunction && address?.countryCode)
  });

  return { status, error, species };
}
