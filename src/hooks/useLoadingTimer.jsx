import { useEffect } from "react";

function useLoadingTimer(loadingTimer, setLoadingTimer) {
  useEffect(() => {
    if (!loadingTimer) return;

    const timer = setTimeout(() => {
      setLoadingTimer(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadingTimer, setLoadingTimer]);
}

export default useLoadingTimer;
