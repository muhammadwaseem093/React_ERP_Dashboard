import { useEffect } from "react";

type UseSessionTimeoutProps = {
  logoutCallback: () => void;
  timeoutMinutes?: number;
};

const useSessionTimeout = ({ logoutCallback, timeoutMinutes = 15 }: UseSessionTimeoutProps) => {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const events = ["click", "mousemove", "keydown", "scroll"];

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logoutCallback();
      }, timeoutMinutes * 60 * 1000); // Convert minutes to milliseconds
    };

    // Attach event listeners
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Initialize timer
    resetTimer();

    // Cleanup on unmount
    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logoutCallback, timeoutMinutes]);
};

export default useSessionTimeout;
