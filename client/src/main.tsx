import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchContextProvider from "context/SearchContext";
import App from "@/App";
import "@/index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SearchContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SearchContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
