import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getSpeciesObservationsByAddress, getSpeciesObservationsByRegion } from "../services/apiEBird";
import { useEffect, useState } from "react";

export function useObservations() {
  const [params, setParams] = useState();
  const [observationsFunction, setObservationsFunction] = useState();
  const { speciesCode } =
    useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");
  const code = searchParams.get("code");

  useEffect(() => {
    try {
      if (!code && !radius) return;
      if (code && radius) {
        throw new Error("Invalid URL: Cannot have both code and radius query parameters.");
      }

      if (code) {
        setParams(code);
        setObservationsFunction(() => getSpeciesObservationsByRegion);
      } else if (radius) {
        setParams({ lat, lng, radius });
        setObservationsFunction(() => getSpeciesObservationsByAddress);
      }
    } catch (e) {
      console.error(e.message)
    }
  }, [lat, lng, radius, code, speciesCode])

  const {
    isLoading,
    data: observations,
    error,
  } = useQuery({
    queryKey: ["observations", params, speciesCode],
    queryFn: () => observationsFunction(params, speciesCode),
    // enabled: false
    enabled: !!(params && speciesCode)
  });

  return { isLoading, error, observations };
}
