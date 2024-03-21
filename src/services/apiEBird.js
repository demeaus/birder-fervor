import DataFrame from "dataframe-js";

import { EBIRD_API_KEY } from "../../secrets";
import { API_URL } from "../utils/constants";

// TODO: Consider combining functions to get species list and species common names
// TODO: Consider optimizing dataframe usage and getting list of speciesCodes from two queries

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
            `Something went wrong while attempting to fetch species in region code ${regionCode}.`
        );
    }

    const data = await res.json();
    return data;
}

export async function getSpeciesCommonNames(speciesCodes) {
    const speciesCodeList = speciesCodes.join(",");
    // console.log(speciesCodeList)

    var headers = new Headers();
    headers.append("X-eBirdApiToken", EBIRD_API_KEY);
    // eBird API blocks Content-Type header
    // headers.append('Content-Type', 'text/csv; charset=UTF-8')

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };
    const res = await fetch(`${API_URL}ref/taxonomy/ebird?species=${speciesCodeList}`, requestOptions);

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