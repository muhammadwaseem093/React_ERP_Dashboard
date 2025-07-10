import { createContext, useState, type ReactNode } from "react";

export type SidebarContextType = {
  refreshTrigger: number;
  triggerRefresh: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <SidebarContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </SidebarContext.Provider>
  );
};
