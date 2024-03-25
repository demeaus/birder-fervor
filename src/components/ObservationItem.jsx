import { LuBird, LuTimer, LuMapPin } from "react-icons/lu";
import { calcObsAge, copyToClipboard } from "../utils/helpers";
import { useEffect, useState } from "react";
import { getAddressbyCoordinates } from "../services/apiGeoapify";
import ButtonCopy from "../ui/ButtonCopy";

function ObervationItem({ obs }) {
  // distance from user's current/entered locations, if chosen
  // starred for user for sorting and export

  const [address, setAddress] = useState();

  function handleClick(text) {
    copyToClipboard(text);
  }

  console.log(obs);
  const obsAge = calcObsAge(obs.obsDt);

  // useEffect(() => {
  //   async function fetchAddress() {
  //     const addressFromCoordinates = await getAddressbyCoordinates({
  //       lat: obs.lat,
  //       lon: obs.lng,
  //     });
  //     if (addressFromCoordinates) setAddress(addressFromCoordinates);
  //   }

  //   fetchAddress();
  // }, [obs.lat, obs.lng]);

  console.log(address);
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
    <li className="p-2 flex flex-col bg-zinc-200">
      <div className="md:flex md:items-center md:gap-4">
        <div className="flex items-center justify-start gap-2 text-sm">
          <LuTimer />
          <span className="text-xs">Last seen: </span>
          {displayLastSeen}
        </div>
        <div className="flex items-center gap-2">
          <LuMapPin />
          <div className="flex flex-col">
            <span className="text-sm">{displayAddressA}</span>
            {address?.address_line1 && displayAddressB}
          </div>
          {address?.address_line1 && (
            <ButtonCopy handleClick={() => handleClick(address.formatted)} />
          )}
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <LuBird />
        {obs.howMany}
      </div>
      <div className="flex items-center justify-start gap-2">
        <LuMapPin />
        <span className="text-sm">{`${obs.lat}, ${obs.lng}`}</span>
        <ButtonCopy handleClick={() => handleClick(`${obs.lat}, ${obs.lng}`)} />
      </div>
    </li>
  );
}

export default ObervationItem;
