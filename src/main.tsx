import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";

import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { Toaster } from "./components/ui/sonner";
import App from "./App";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigate>
        <App />
        <Toaster visibleToasts={1} position="top-right" richColors />
      </Auth0ProviderWithNavigate>
    </QueryClientProvider>
  </React.StrictMode>
);
