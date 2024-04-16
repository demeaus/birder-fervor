/**
 * Converts coordinates into address
 */
import { useQuery } from "@tanstack/react-query";
import { getIPLocation } from "../services/apiRadar";
import { useRef } from "react";

export function useIPLocation() {
    const ref = useRef((Date.now() + Math.random()).toString(36));

    const {
        isLoading,
        data: location,
        error,
    } = useQuery({
        queryKey: ["user", ref.current],
        queryFn: getIPLocation,
    });

    return { isLoading, error, location };
}
