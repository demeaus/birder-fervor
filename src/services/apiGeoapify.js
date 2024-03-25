import { GEOAPIFY_API_KEY } from "../../secrets";
import { GEOAPIFY_API_URL } from "../utils/constants";

/**
 * Retrieves address for given GPS coordinates (reverse geocoding)
 */
// TODO: How to hide apiKey?
export async function getAddressbyCoordinates({ lat, lon }) {
    var headers = new Headers();
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${GEOAPIFY_API_URL}reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${GEOAPIFY_API_KEY}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch the observation address.`
        );
    }

    const data = await res.json();
    const address = data.results[0]
    return address;
}

/**
 * Gets autocomplete suggestions for given location query
 */
export async function getAutocompleteSuggestions(query) {
    var headers = new Headers();
    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${GEOAPIFY_API_URL}autocomplete?text=${query}&type=state&format=json&apiKey=${GEOAPIFY_API_KEY}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to autocomplete the address.`
        );
    }

    const data = await res.json();
    const suggestions = data.results
    return suggestions;
}