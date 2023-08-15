import { useEffect, useState } from "react";

//
const tokenName = "user-session-id";

/**
 * Custom hook to handle localstorage data
 */
export default function useUserSession() {
  const [sessionId, setSessionId] = useState<string>("");
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  //
  function generateNewToken() {
    const newId = Date.now().toString(32);
    return newId;
  }

  //
  function getUserId() {
    return localStorage.getItem(tokenName) ?? "";
  }

  //
  useEffect(() => {
    const userId = localStorage.getItem(tokenName);

    if (userId) {
      setSessionId(userId);
      setIsFirstTime(false);
    } else {
      const newId = generateNewToken();
      localStorage.setItem(tokenName, newId);
      setSessionId(newId);
    }
  }, []);

  return { userId: sessionId, isFirstTime, getUserId };
}
