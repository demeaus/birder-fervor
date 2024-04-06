import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Main from "./components/Main";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
      },
      {
        path: "/:layer",
        element: <Main />,
        errorElement: <Error />,
      },
      {
        path: "/:layer/:speciesCode",
        element: <Main />,
        errorElement: <Error />,
      },
      {
        path: "/:layer/:speciesCode/:checklistCode",
        element: <Main />,
        errorElement: <Error />,
      },
      // {
      //   path: ":/regionCode",
      //   element: <Main />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/:regionCode/:speciesCode",
      //   element: <Main />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/:regionCode/:speciesCode/:checklistCode",
      //   element: <Main />,
      //   errorElement: <Error />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
