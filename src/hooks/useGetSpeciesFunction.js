/**
 * useGetSpeciesFunction.js
 */

import { useEffect, useState } from "react";
import { getRecentSpeciesByAddress, getRecentSpeciesByRegion } from "../services/apiEBird";
import { getAddressbyCoordinates } from "../services/apiRadar";
import { useParams, useSearchParams } from "react-router-dom";

export function useGetSpeciesFunction() {
    const { layer } = useParams();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const [params, setParams] = useState(null);
    const [speciesFunction, setSpeciesFunction] = useState(null)

    useEffect(
        () => {
            async function handleLocation(layer, lat, lng) {
                // If layer is state or country, convert option value to ISO standardized code to get region code for eBird API
                if (layer === 'state') {
                    const { stateCode, countryCode } = await getAddressbyCoordinates(layer, lat, lng);
                    setParams(`${countryCode}-${stateCode}`)
                    setSpeciesFunction(() => getRecentSpeciesByRegion);
                } else if (layer === 'country') {
                    const { countryCode } = await getAddressbyCoordinates(layer, lat, lng);
                    setParams(countryCode);
                    setSpeciesFunction(() => getRecentSpeciesByRegion);
                } else {
                    //TODO: make radius variable
                    const radius = 25;
                    setParams({ lat, lng, radius });
                    setSpeciesFunction(() => getRecentSpeciesByAddress);
                }
            }
            if (!(layer || lat || lng)) return;

            handleLocation(layer, lat, lng);
        }
        , [layer, lat, lng]
    )
    return { params, speciesFunction }

}
