import { LuBird, LuExternalLink, LuMapPin } from "react-icons/lu";
import { calcObsAge, copyToClipboard } from "../utils/helpers";
import { useEffect, useState } from "react";
import { getAddressbyCoordinates } from "../services/apiGeoapify";
import { Link } from "react-router-dom";
import { EBIRD_CHECKLIST_URL } from "../utils/constants";

function ObervationItem({ obs, onSelectPin }) {
  // distance from user's current/entered locations, if chosen
  // starred for user for sorting and export

  const [address, setAddress] = useState();

  function handleClick(text) {
    copyToClipboard(text);
  }

  const obsAge = calcObsAge(obs.obsDt);

  // TODO: getAddressByCoordinates is responsible for many API calls
  useEffect(() => {
    async function fetchAddress() {
      const addressFromCoordinates = await getAddressbyCoordinates({
        lat: obs.lat,
        lon: obs.lng,
      });
      if (addressFromCoordinates) setAddress(addressFromCoordinates);
    }

    fetchAddress();
  }, [obs.lat, obs.lng]);

  // TODO: Handle localization of address format
  const displayAddressA = address?.address_line1 ?? obs.locName;
  const displayAddressB = address?.address_line1 ? (
    <span className="text-nowrap text-xs">{`${address?.city ?? address?.county ?? ""}, ${
      address?.state_code?.toUpperCase() ?? address?.state
    }${
      address?.postcode ? " " + address.postcode : ""
    }, ${address?.country_code.toUpperCase()}`}</span>
  ) : null;

  const displayLastSeen =
    obsAge.days > 0
      ? `${obsAge.days} ${obsAge.days === 1 ? "day" : "days"}
      ${
        obsAge.hours > 0
          ? ` and ${obsAge.hours} ${obsAge.hours === 1 ? "hour" : "hours"} ago`
          : ""
      }`
      : obsAge.hours > 0
        ? `${obsAge.hours} ${obsAge.hours === 1 ? "hour" : "hours"} ago`
        : "now";

  return (
    <li
      className="flex max-w-sm flex-col justify-normal gap-2 bg-gray-200 p-4 shadow-sm"
      onClick={(e) => {
        onSelectPin({ lat: obs.lat, lng: obs.lng });
        e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between gap-2 rounded border border-solid border-yellow-400 bg-yellow-100 px-3 py-1">
        <Link to={`${EBIRD_CHECKLIST_URL}/${obs.subId}`}>
          <div className="flex items-center justify-start gap-2" role="link">
            <LuExternalLink />
            <span className="text-xs">Last seen: </span>
            <span className="text-sm">{displayLastSeen}</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <LuBird />
            {obs.howMany}
          </div>
        </Link>
      </div>
      <div className="flex justify-stretch gap-2">
        <div
          className="flex basis-1/2 items-center justify-start gap-2 rounded bg-gray-50 py-2 pl-3 pr-4"
          role="button"
          onClick={() => handleClick(address.formatted)}
        >
          <LuMapPin />
          <div className="flex flex-col">
            <span className="text-sm">{displayAddressA}</span>
            {address?.address_line1 && displayAddressB}
          </div>
        </div>

        <div
          className="flex basis-1/2 items-center justify-start gap-2 rounded bg-gray-50 py-2 pl-3 pr-4 "
          role="button"
          onClick={(e) => {
            handleClick(`${obs.lat}, ${obs.lng}`);
            e.stopPropagation();
          }}
        >
          <LuMapPin className="shrink-0" />
          <span className="text-sm">{`${obs.lat}, ${obs.lng}`}</span>
        </div>
      </div>
    </li>
  );
}

export default ObervationItem;
