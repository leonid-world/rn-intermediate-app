import React, { createContext, useState, useEffect } from "react";

import { getUser } from "../utils/authStorage";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true); //로딩 상태 추가

  useEffect(() => {
    const init = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser); //자동 로그인
      }
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
