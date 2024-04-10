import { Outlet } from "react-router-dom";
import Header from "./Header";
import { LocationProvider } from "../context/LocationContext";

function AppLayout() {
  return (
    <LocationProvider>
      <div>
        <Header />
        <Outlet />
      </div>
    </LocationProvider>
  );
}

export default AppLayout;
