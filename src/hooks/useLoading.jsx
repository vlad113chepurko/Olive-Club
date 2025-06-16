import {useEffect} from "react";

function useLoading(loading, setLoading) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
}

export default useLoading;