/**
 * Converts coordinates into address
 */
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getAddressbyCoordinates } from "../services/apiRadar";

export function useAddress() {
    const { layer } = useParams();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const {
        isLoading,
        data: address,
        error,
    } = useQuery({
        queryKey: ["address", { layer, lat, lng }],
        queryFn: () => getAddressbyCoordinates(layer, lat, lng),
        enabled: !!(layer && lat && lng)
    });

    return { isLoading, error, address };
}
