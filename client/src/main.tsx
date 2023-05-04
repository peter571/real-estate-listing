import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import SearchContextProvider from "./contexts/SearchContext";

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
