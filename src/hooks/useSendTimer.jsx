import { useEffect } from "react";

function  useSendTimer(setTimer, resendDisabled, setResendDisabled) {

  useEffect(() => {
    let interval;
    if (resendDisabled) {
      setTimer(30);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [resendDisabled]);
}

export default useSendTimer;