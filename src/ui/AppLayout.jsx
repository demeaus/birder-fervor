import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
