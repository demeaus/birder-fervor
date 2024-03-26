import { Outlet } from "react-router-dom";
import Header from "./Header";
import Controls from "../components/Controls";

function AppLayout() {
  console.log("rendering AppLayout");
  return (
    <div>
      <Header />
      <Controls />
      <Outlet />
    </div>
  );
}

export default AppLayout;
