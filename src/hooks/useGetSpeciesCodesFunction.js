import { useEffect, useState } from "react";
import { getSpeciesCodesByAddress, getSpeciesCodesByRegion } from "../services/apiEBird";
import { getAddressbyCoordinates } from "../services/apiRadar";
import { useParams, useSearchParams } from "react-router-dom";

export function useGetSpeciesCodesFunction() {
    const { layer } = useParams();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const [params, setParams] = useState(null);
    const [speciesCodesFunction, setSpeciesCodesFunction] = useState(null)

    useEffect(
        () => {
            async function handleLocation(layer, lat, lng) {
                // If layer is state or country, convert option value to ISO standardized code to get region code for eBird API
                if (layer === 'state') {
                    const { stateCode, countryCode } = await getAddressbyCoordinates(layer, lat, lng);
                    setParams(`${countryCode}-${stateCode}`)
                    setSpeciesCodesFunction(getSpeciesCodesByRegion);
                    //   return { params: `${countryCode}-${stateCode}`, speciesCodesFunction: getSpeciesCodesByRegion };
                } else if (layer === 'country') {
                    const { countryCode } = await getAddressbyCoordinates(layer, lat, lng);
                    setParams(countryCode);
                    setSpeciesCodesFunction(getSpeciesCodesByRegion);
                    //   return { params: countryCode, speciesCodesFunction: getSpeciesCodesByRegion };
                } else {
                    //TODO: make radius variable
                    const radius = 25;
                    setParams({ lat, lng, radius });
                    setSpeciesCodesFunction(getSpeciesCodesByAddress);
                    //   return { params: { lat, lng, radius }, speciesCodesFunction: getSpeciesCodesByAddress };
                }
            }
            handleLocation(layer, lat, lng);
        }
        , [layer, lat, lng]
    )
    return { params, speciesCodesFunction }

}
