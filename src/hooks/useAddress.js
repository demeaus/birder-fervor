/**
 * Converts coordinates into address
 */
import { useQuery } from "@tanstack/react-query";
import { getAddressbyCoordinates } from "../services/apiRadar";

export function useAddress({ layer, lat, lng }) {
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
