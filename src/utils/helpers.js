export function copyToClipboard(text) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(text);

    // TODO: use tool tip instead of alert
    alert("Copied: " + text);
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


const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: "numeric",
    minute: "numeric",
};

export function formatDate(dateStr) {
    const dateFormat = new Intl.DateTimeFormat('en-US', options);
    const date = new Date(dateStr)
    return dateFormat.format(date)
}

export function buildDisplayAddress(address) {
    const addressLabel = address?.addressLabel;
    const placeLabel = address?.placeLabel;

    function buildLine2(address) {
        const addressLabel = address?.addressLabel;

        if (!addressLabel) return;

        const part1 =
            address?.city && !addressLabel.includes(address.city)
                ? address.city
                : address?.county && !addressLabel.includes(address.county)
                    ? address.county
                    : null;

        const part2 =
            (address?.stateCode?.toUpperCase() ?? address?.state) +
            (address?.postalCode ? ` ${address?.postalCode}` : "") +
            " " +
            address?.countryCode.toUpperCase();

        return part1 + ", " + part2;
    }
    const line1 = addressLabel ?? placeLabel ?? "";

    const line2 = addressLabel
        ? buildLine2(address)
        : placeLabel
            ? address.formattedAddress
            : null;

    if (!address) return;

    return [line1, line2]
}

export function buildDisplayLastSeen(age) {
    const displayLastSeen =
        age.days > 0
            ? `${age.days} ${age.days === 1 ? "day" : "days"}${age.hours > 0
                ? `, ${age.hours} ${age.hours === 1 ? "hour" : "hours"} ago`
                : ""
            }`
            : age.hours > 0
                ? `${age.hours} ${age.hours === 1 ? "hour" : "hours"} ago`
                : "now";
    return displayLastSeen
}

// Derive URL parameters for eBird API calls from URL
export function getParams(location) {
    let code, radius;
    if (!location?.layer) return;
    try {
        if (location.layer === "state") {
            if (!(location?.countryCode || location?.stateCode)) {
                throw new Error("Missing country code or state code for this state.");
            }
            code = `${location?.countryCode}-${location?.stateCode}`;
        } else if (location.layer === "country") {
            if (!location?.countryCode) {
                throw new Error("Missing country code for this country.");
            }
            code = location?.countryCode;
        } else {
            //TODO: make radius variable
            radius = 25;
            if (!(location?.latitude || location?.longitude || radius)) {
                throw new Error("Missing information to search by address.");
            }
        }

        return { code, radius };
    } catch (e) {
        console.error(e.message);
    }
}