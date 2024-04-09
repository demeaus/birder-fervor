/**
 * Converts coordinates into address
 */
import { useQuery } from "@tanstack/react-query";
import { getAddressbyCoordinates } from "../services/apiRadar";

export function useAddress(data) {
    const layer = data?.layer;
    const lat = data?.lat;
    const lng = data?.lng;

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
