import { iso31662 } from "iso-3166";
import { closestMatch } from "closest-match";

// Function to filter ISO 3166-2 subdivision codes by parent/country and name/state/province
export function getRegionCode(parent, name) {
    const sanitizedParent = parent.toUpperCase();
    const sanitizedName = name.toUpperCase();

    // Get array of region objects by country/parent
    const filteredRegions = iso31662.filter(
        (obj) => obj.parent.toUpperCase() === sanitizedParent
    )

    // Get list of name/subdivisions, uppercase
    const subdivisions = filteredRegions.map((obj) => obj.name.toUpperCase())

    // Get closest matching subdivision
    const closestName = closestMatch(sanitizedName, subdivisions)
    console.log("closest: ", closestName)

    // Get regionCode by closest matching name/state/province from filteredRegions

    const regionCode = filteredRegions.filter((obj) => obj.name.toUpperCase() === closestName)[0].code
    return regionCode
}