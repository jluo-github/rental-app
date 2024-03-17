"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

// wrap the entire app with this provider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

// custom hook to use the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
