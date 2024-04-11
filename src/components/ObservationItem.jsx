import { LuBird, LuExternalLink, LuMapPin } from "react-icons/lu";
import { calcObsAge, copyToClipboard, formatDate } from "../utils/helpers";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { EBIRD_CHECKLIST_URL } from "../utils/constants";
import { useAddress } from "../hooks/useAddress";
// import { getAddressbyCoordinates } from "../services/apiGeoapify";

function ObervationItem({ obs, idx, onSelectPin }) {
  // distance from user's current/entered locations, if chosen
  // starred for user for sorting and export

  // const [address, setAddress] = useState();
  const navigate = useNavigate();
  const { layer, speciesCode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { address } = useAddress({
    layer: "fine",
    lat: obs.lat,
    lng: obs.lng,
  });
  const obsAge = calcObsAge(obs.obsDt);

  function handleCopy(text) {
    copyToClipboard(text);
  }

  function handleClick() {
    navigate(`/${layer}/${speciesCode}/${obs.subId}`);
    // setSearchParams(searchParams);
    setSearchParams(searchParams, { replace: true });
    onSelectPin({ idx: idx, lat: obs.lat, lng: obs.lng });
    // e.stopPropagation();
  }

  // TODO: Handle localization of address format

  const displayAddressA = address?.addressLabel ?? obs.locName;
  const displayAddressB = address?.addressLabel ? (
    <span className="text-xs">
      <>
        {(address.addressLabel.includes(address?.city) ||
          address.addressLabel.includes(address?.county)) &&
        (address.addressLabel.includes(address?.stateCode) ||
          address.addressLabel.includes(address?.state))
          ? ""
          : `${address?.city ?? address?.county ?? ""}, ${
              address?.stateCode?.toUpperCase() ?? address?.state
            }`}
        , {`${address?.countryCode.toUpperCase()}`}
      </>
    </span>
  ) : null;

  const displayLastSeen =
    obsAge.days > 0
      ? `${obsAge.days} ${obsAge.days === 1 ? "day" : "days"}${
          obsAge.hours > 0
            ? `, ${obsAge.hours} ${obsAge.hours === 1 ? "hour" : "hours"} ago`
            : ""
        }`
      : obsAge.hours > 0
        ? `${obsAge.hours} ${obsAge.hours === 1 ? "hour" : "hours"} ago`
        : "now";

  return (
    <li
      className="flex max-w-sm flex-col justify-normal gap-2 bg-gray-700 p-4"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-0.5 rounded border-2 border-solid border-yellow-500 bg-yellow-100 px-4 py-1">
        <div className="flex w-full justify-between">
          <span className="font-semibold">
            {idx + 1}. {formatDate(obs.obsDt)}
          </span>
          <div className="flex items-center justify-end gap-2 font-semibold">
            <span className="text-xl">
              <LuBird />
            </span>
            {obs.howMany}
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-start gap-2">
            <span className="text-xs">Last seen: </span>
            <span className="text-sm">{displayLastSeen}</span>
          </div>
          <Link
            target="_blank"
            to={`${EBIRD_CHECKLIST_URL}/${obs.subId}`}
            className="flex items-center justify-end font-semibold text-yellow-800"
            // className="flex max-w-fit items-center justify-end gap-2 font-semibold text-yellow-800"
          >
            <div className="mt-1 flex justify-end gap-1">
              <LuExternalLink />
              <span className="text-sm">eBird</span>
            </div>
          </Link>
        </div>
      </div>
      <div
        className="flex items-center justify-start gap-2 rounded border-2 border-solid border-gray-400 bg-gray-200 py-2 pl-3 pr-4"
        role="button"
        onClick={() => handleCopy(address.formatted)}
      >
        <LuMapPin className="shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm">{displayAddressA}</span>
          {address?.addressLabel && displayAddressB}
        </div>
      </div>

      <div
        className="flex items-center justify-start gap-2 rounded border-2 border-solid border-gray-400 bg-gray-200 py-2 pl-3 pr-4 "
        role="button"
        onClick={(e) => {
          handleCopy(`${obs.lat}, ${obs.lng}`);
          // e.stopPropagation();
        }}
      >
        <LuMapPin className="shrink-0" />
        <span className="text-sm">{`${obs.lat}, ${obs.lng}`}</span>
      </div>
    </li>
  );
}

export default ObervationItem;
