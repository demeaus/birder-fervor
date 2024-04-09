/**
 * useSpeciesCodes.js
 */
import { useQuery } from "@tanstack/react-query";
import { getRecentSpeciesByAddress, getRecentSpeciesByRegion } from "../services/apiEBird";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function useSpecies() {
  const [params, setParams] = useState();
  const [speciesFunction, setSpeciesFunction] = useState();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");
  const code = searchParams.get("code");

  useEffect(() => {
    try {
      if (!code && !radius) {
        throw new Error("Invalid URL: Missing code and radius query parameters.");
      } else if (code && radius) {
        throw new Error("Invalid URL: Cannot have both code and radius query parameters.");
      }

      if (code) {
        setParams(code);
        setSpeciesFunction(() => getRecentSpeciesByRegion);
      } else if (radius) {
        setParams({ lat, lng, radius });
        setSpeciesFunction(() => getRecentSpeciesByAddress);
      }
    } catch (e) {
      console.error(e.message)
    }
  }, [lat, lng, radius, code, searchParams])

  const {
    status,
    data: species,
    error,
  } = useQuery({
    queryKey: ["species", params],
    queryFn: () => speciesFunction(params),
    // enabled: false
    enabled: !!(params && speciesFunction)
  });

  return { status, error, species };
}
