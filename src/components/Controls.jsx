import SelectRegion from "./SelectRegion";
import SelectSpecies from "./SelectSpecies";
import { useParams } from "react-router-dom";

function Controls({ children }) {
  console.log("rendering Controls");
  return (
    <div className="bg-zinc-100 px-4 py-4 ">
      {/* TODO: Search for species by address*/}
      {children}
    </div>
  );
}

export default Controls;
