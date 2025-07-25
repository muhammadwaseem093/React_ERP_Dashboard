import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import useSessionTimeout from "./hooks/useSessionTimeout";
import { SidebarProvider } from "./context/SidebarContext";

const App: React.FC = () => {
  const logoutCallback = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // Redirect to login page
  };

  useSessionTimeout({ logoutCallback, timeoutMinutes: 15 });

  return (
    <SidebarProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </SidebarProvider>
  );
};

export default App;
