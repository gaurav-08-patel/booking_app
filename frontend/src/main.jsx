import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toast";
import { AppContextProvider } from "./contexts/AppContext.jsx";

let queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppContextProvider>
                <App />
            </AppContextProvider>
            <ToastContainer position="top-right" delay={3000} />
        </QueryClientProvider>
    </StrictMode>,
);
