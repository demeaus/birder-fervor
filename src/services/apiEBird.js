import DataFrame from "dataframe-js";
import { EBIRD_API_URL } from "../utils/constants";

// TODO: Consider combining functions to get species list and species common names
// TODO: Consider optimizing dataframe usage and getting list of speciesCodes from two queries

/**
 * Retrieves species in a region
 */
export async function getSpeciesCodesByRegion(regionCode) {
    console.log("getSpeciesCodesByRegion", regionCode)
    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${EBIRD_API_URL}product/spplist/${regionCode}`, requestOptions);

    if (!res.ok) {
        throw new Error(
            `Something went wrong while attempting to fetch species in region code ${regionCode}.`
        );
    }

    const speciesCodes = await res.json();
    return speciesCodes;
}

/**
 * Retrieves species near an address
 */
export async function getSpeciesCodesByAddress({ lat, lng, radius }) {
    console.log("TODO: getSpeciesCodesByAddress", lat, lng, radius)
    var headers = new Headers();
    headers.append("X-eBirdApiToken", import.meta.env.VITE_EBIRD_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    // const res = await fetch(`${EBIRD_API_URL}product/spplist/${regionCode}`, requestOptions);

    // if (!res.ok) {
    //     throw new Error(
    //         `Something went wrong while attempting to fetch species in region code ${regionCode}.`
    //     );
    // }

    // const speciesCodes = await res.json();
    // return speciesCodes;
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

export async function getObservationsBySpecies(regionCode, speciesCode) {
    console.log("getObservationsBySpecies", regionCode, speciesCode)
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