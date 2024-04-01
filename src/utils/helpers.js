import { iso31662 } from "iso-3166";
import { closestMatch } from "closest-match";

// Filter ISO 3166-2 subdivision codes by parent/country and name/state/province
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
    // console.log("closest: ", closestName)

    // Get regionCode by closest matching name/state/province from filteredRegions

    const regionCode = filteredRegions.filter((obj) => obj.name.toUpperCase() === closestName)[0].code
    return regionCode
}

export function copyToClipboard(text) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(text);

    // Alert the copied text
    // TODO: use tool tip instead of alert
    // alert("Copied the text: " + text);
}

export function calcObsAge(dateStr) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const pastDate = new Date(dateStr);
    const nowDate = new Date();

    const difference = nowDate - pastDate;
    const daysDifference = Math.floor(difference / millisecondsPerDay);
    const hoursDifference = Math.floor((difference % millisecondsPerDay) / (1000 * 60 * 60));

    return { days: daysDifference, hours: hoursDifference };
}