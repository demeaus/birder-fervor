import { useEffect, useState } from "react";
import { getAutocompleteSuggestions } from "../services/apiRadar";

/** 
 * Fetches list of autocomplete suggestions for search input
 */
export function useAddressAutocomplete(query) {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchAutocompleteSuggestions() {
            try {
                setIsLoading(true);
                setError("");
                const suggestionsList = await getAutocompleteSuggestions(query);

                // Format suggestions for React Select component
                if (suggestionsList) {
                    setSuggestions(
                        suggestionsList.map((obj) => ({
                            value: obj,
                            label: `${obj.countryFlag} ${obj.formattedAddress}`,
                        })),
                    );
                }
            } catch (e) {
                console.error(e.message);
                setError(e.message)

            } finally {
                setIsLoading(false);
            }
        }

        // Reduce amount of fetching by introducing delay while user enters query
        let timer = setTimeout(() => {
            if (query) {
                fetchAutocompleteSuggestions();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [query]);

    return { isLoading, error, suggestions }
}