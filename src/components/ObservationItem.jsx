import { LuBird, LuTimer, LuMapPin } from "react-icons/lu";
import { calcObsAge, copyToClipboard } from "../utils/helpers";
import { useEffect, useState } from "react";
import { getAddressbyCoordinates } from "../services/apiGeoapify";

function ObervationItem({ obs }) {
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
    <span className="text-xs">{`${address?.city ?? address?.county ?? ""}, ${
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
    <li className="flex flex-col justify-normal gap-2 bg-zinc-200 p-3">
      <div className="sm:flex sm:items-center sm:gap-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-start gap-2">
            <LuTimer />
            <span className="text-xs">Last seen: </span>
            <span className="text-sm">{displayLastSeen}</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <LuBird />
            {obs.howMany}
          </div>
        </div>
      </div>
      <div
        className="flex max-w-fit items-center justify-start gap-2 rounded bg-zinc-300 px-2 py-1 text-xs"
        role="button"
        onClick={() => handleClick(address.formatted)}
      >
        <LuMapPin />
        <div className=" flex flex-col ">
          <span className="text-sm">{displayAddressA}</span>
          {address?.address_line1 && displayAddressB}
        </div>
      </div>

      <div
        className="flex max-w-fit items-center justify-start gap-2 rounded bg-zinc-300 px-2 py-1 text-xs"
        role="button"
        onClick={() => handleClick(`${obs.lat}, ${obs.lng}`)}
      >
        <LuMapPin />
        <span className="text-sm">{`${obs.lat}, ${obs.lng}`}</span>
      </div>
    </li>
  );
}

export default ObervationItem;
