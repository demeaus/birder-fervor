import { useQuery } from "@tanstack/react-query";
import { getAutocompleteSuggestions } from "../services/apiGeoapify";

export function useSpecies() {
  const {
    isLoading,
    data: suggestions,
    error,
  } = useQuery({ queryKey: ["suggestions"], queryFn: getAutocompleteSuggestions });

  return { isLoading, error, suggestions };
}
