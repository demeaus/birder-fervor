import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ObservationsProvider } from "./context/ObservationsContext";
import AppLayout from "./ui/AppLayout";
import Observations from "./ui/Observations";
import Home from "./ui/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ObservationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path=":regionCode" element={<Observations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ObservationsProvider>
    </QueryClientProvider>
  );
}

export default App;
