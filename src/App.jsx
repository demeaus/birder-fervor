import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

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
      <BrowserRouter basename="app">
        <Routes>
          <Route index element={<AppLayout />} path="/" />
          <Route element={<AppLayout />} path="/:regionCode" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
