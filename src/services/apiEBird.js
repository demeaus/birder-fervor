import { EBIRD_API_KEY } from "../../secrets";
import { API_URL } from "../utils/constants";

/**
 * Retrieves species in a region
 */
export async function getSpeciesByRegion(regionCode) {
    var headers = new Headers();
    headers.append("X-eBirdApiToken", EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${API_URL}product/spplist/${regionCode}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch species in region code ${regionCode}`
        );
    }

    const data = await res.json();
    return data;
}