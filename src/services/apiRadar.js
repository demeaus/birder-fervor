import { RADAR_API_URL } from "../utils/constants";

/**
 * Retrieves address for given GPS coordinates (reverse geocoding)
 */
export async function getAddressbyCoordinates(layer, lat, lng) {
    console.log("getAddressbyCoordinates", layer, lat, lng)
    var headers = new Headers();
    headers.append("Authorization", import.meta.env.VITE_RADAR_API_KEY);
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${RADAR_API_URL}geocode/reverse?coordinates=${lat},${lng}&layers=${layer}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch the address from the coordinates.`
        );
    }

    const data = await res.json();

    // Return the closest match
    const location = data.addresses[0];
    return location;
}

/**
 * Gets autocomplete suggestions for given location query
 */
export async function getAutocompleteSuggestions(query) {
    console.log("getAutocompleteSuggestions")
    var headers = new Headers();
    headers.append("Authorization", import.meta.env.VITE_RADAR_API_KEY);
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    // regional search: layers=course
    // address + radius search: layers=fine
    const res = await fetch(`${RADAR_API_URL}search/autocomplete?query=${query}`, requestOptions);
    // const res = await fetch(`${RADAR_API_URL}search/autocomplete?query=${query}&layers=coarse`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to autocomplete the search.`
        );
    }

    const data = await res.json();
    // console.log(data)
    const suggestions = data.addresses
    return suggestions;
}