import DataFrame from "dataframe-js";
import { EBIRD_API_URL } from "../utils/constants";

/**
 * Retrieves species in a region
 */
export async function getRecentSpeciesByRegion(regionCode) {
    console.log("getRecentSpeciesByRegion", regionCode)
    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${EBIRD_API_URL}data/obs/${regionCode}/recent`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch species in region code ${regionCode}.`
        );
    }

    const observations = await res.json();
    console.log(observations)
    return observations;
}

/**
 * Retrieves species near an address
 */
export async function getRecentSpeciesByAddress({ lat, lng, radius }) {
    console.log("getRecentSpeciesByAddress", lat, lng, radius)
    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${EBIRD_API_URL}data/obs/geo/recent?lat=${lat}&lng=${lng}&dist=${radius}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch species near ${lat}, ${lng}.`
        );
    }

    const observations = await res.json();
    console.log(observations)
    return observations;
}



export async function getSpeciesCommonNames(speciesCodes = []) {
    console.log("getSpeciesCommonNames", speciesCodes.length)
    const speciesCodeList = speciesCodes.join(",");

    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
    };
    const res = await fetch(`${EBIRD_API_URL}ref/taxonomy/ebird?species=${speciesCodeList}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch species common names.`
        );
    }

    const data = await res.text();

    // Convert response body to array
    const arr = data.split('\n')
    for (let row in arr) {
        arr[row] = arr[row].split(",")
    }

    // Convert array to dataframe
    const df = new DataFrame(arr.slice(1, -1), arr[0])
    return df.select('SPECIES_CODE', 'COMMON_NAME').toArray();
}

export async function getSpeciesObservationsByRegion(regionCode, speciesCode) {
    console.log("getSpeciesObservationsByRegion", regionCode, speciesCode)
    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
    };
    // TODO: Increase number of results or make customizable in production
    const res = await fetch(`${EBIRD_API_URL}data/obs/${regionCode}/recent/${speciesCode}?maxResults=6`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch recent observations for speciesCode: ${speciesCode} in regionCode: ${regionCode}.`
        );
    }
    const observations = await res.json();
    return observations;
}

export async function getSpeciesObservationsByAddress({ lat, lng, radius }, speciesCode) {
    console.log("getSpeciesObservationsByAddress", lat, lng, radius, speciesCode)
    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
    };
    // TODO: Increase number of results or make customizable in production
    const res = await fetch(`${EBIRD_API_URL}data/obs/geo/recent/${speciesCode}&lat=${lat}&lng=${lng}&dist=${radius}&maxResults=6`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch recent observations for speciesCode: ${speciesCode} in near ${lat}, ${lng}.`
        );
    }
    const observations = await res.json();
    return observations;
}