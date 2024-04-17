/**
 * Converts coordinates into address
 */
import { useQuery } from "@tanstack/react-query";
import { getIPLocation } from "../services/apiRadar";

export function useIPLocation() {
    const {
        isLoading,
        data: location,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getIPLocation,
        staleTime: 60 * 1000 * 5,
    });

    return { isLoading, error, location };
}
