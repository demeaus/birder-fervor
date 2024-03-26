import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ObservationsProvider } from "./context/ObservationsContext";

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
        <BrowserRouter basename="app">
          <Routes>
            <Route index element={<AppLayout />} path="/" />
            <Route element={<AppLayout />} path="/:regionCode" />
          </Routes>
        </BrowserRouter>
      </ObservationsProvider>
    </QueryClientProvider>
  );
}

export default App;
