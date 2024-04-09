/**
 * Converts coordinates into address
 */
import { useQuery } from "@tanstack/react-query";
import { getAddressbyCoordinates } from "../services/apiRadar";
import { useParams, useSearchParams } from "react-router-dom";

export function useAddress(data) {
    const { layer: layerURL } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // If layer, lat, lng is not provided, useAddress defaults to URL values
    let layer, lat, lng;
    if (data?.layer) {
        layer = data?.layer;
        lat = data?.lat;
        lng = data?.lng;
    } else {
        layer = layerURL;
        lat = searchParams.get('lat');
        lng = searchParams.get('lng');
    }

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
