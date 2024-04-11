import { LuBird, LuExternalLink, LuMapPin } from "react-icons/lu";
import {
  buildDisplayAddress,
  buildDisplayLastSeen,
  calcObsAge,
  copyToClipboard,
  formatDate,
} from "../utils/helpers";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { EBIRD_CHECKLIST_URL } from "../utils/constants";
import { useAddress } from "../hooks/useAddress";
import { useEffect, useState } from "react";

function ObervationItem({ obs, idx, onSelectPin }) {
  // TODO: distance from user's current/entered locations, if chosen

  const navigate = useNavigate();
  const { layer, speciesCode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { address } = useAddress({
    layer: "fine",
    lat: obs.lat,
    lng: obs.lng,
  });
  const [addressLines, setAddressLines] = useState([]);
  const obsAge = calcObsAge(obs.obsDt);

  function handleCopy(text) {
    copyToClipboard(text);
  }

  function handleClick() {
    console.log(address);

    navigate(`/${layer}/${speciesCode}/${obs.subId}`);
    // setSearchParams(searchParams);
    setSearchParams(searchParams, { replace: true });
    onSelectPin({ idx: idx, lat: obs.lat, lng: obs.lng });
    // e.stopPropagation();
  }

  useEffect(() => {
    const lines = buildDisplayAddress(address);
    setAddressLines(lines);
  }, [address]);

  const displayLastSeen = buildDisplayLastSeen(obsAge);

  return (
    <li
      className="flex max-w-sm flex-col justify-normal gap-2 bg-gray-700 p-4"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center gap-0.5 rounded border-2 border-solid border-yellow-500 bg-yellow-100 px-4 py-1">
        <div className="flex w-full justify-between gap-6">
          <span className="text-nowrap text-sm font-semibold lg:text-base">
            {idx + 1}. {formatDate(obs.obsDt)}
          </span>
          <div className="flex items-center justify-end gap-2 text-sm font-semibold lg:text-lg">
            <span className="text-lg">
              <LuBird />
            </span>
            {obs.howMany}
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-start gap-2 text-xs">
            <span className="">Last seen: </span>
            <span className="">{displayLastSeen}</span>
          </div>
          <Link
            target="_blank"
            to={`${EBIRD_CHECKLIST_URL}/${obs.subId}`}
            className="flex items-center justify-end text-sm font-semibold text-yellow-800"
          >
            <div className="mt-1 flex items-center justify-end gap-1">
              <LuExternalLink />
              <span className="text-xs lg:text-base">eBird</span>
            </div>
          </Link>
        </div>
      </div>
      <div
        className="flex items-center justify-start gap-2 rounded border-2 border-solid border-gray-400 bg-gray-200 py-2 pl-3 pr-4"
        role="button"
        onClick={() =>
          handleCopy(
            addressLines.at(0) && addressLines.at(1)
              ? `${addressLines[0]}, ${addressLines[1]}`
              : address.formattedAddress,
          )
        }
      >
        <LuMapPin className="shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm">{addressLines[0] ?? obs.locName}</span>
          <span className="text-xs">
            {addressLines[0] ? addressLines[1] : null}
          </span>
          {/* )} */}
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
        <span className="text-xs lg:text-sm">{`${obs.lat}, ${obs.lng}`}</span>
      </div>
    </li>
  );
}

export default ObervationItem;
