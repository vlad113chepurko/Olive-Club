import axios from "axios";
import useLoadingStore from "../store/LoadingStore";
import { useNavigate } from "react-router-dom";
import useErrorStore from "../store/ErrorStore";

function useVerify() {

  const { loading, setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const { setError } = useErrorStore();

  const handleVerifyCode = async (e, email, code, setResendDisabled) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://www.familyoliveclub.com/api/form/verify', {
        email,
        code,
      });

      if (response.status === 200) {
        setLoading(false);
        navigate('/form/login');
      } else {
        setResendDisabled(false);
        setLoading(false);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Error with verification code.";
      setError(true, message);
      setResendDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async (email, setResendDisabled) => {
    try {
      await axios.post('http://localhost:3000/api/resendCode', { email });
    } catch (error) {
      const message = error?.response?.data?.message || "Error with resend code, please try again.";
      setError(true, message);
      setResendDisabled(false);
    }
  };


  return {
    handleVerifyCode,
    handleResendCode,
  };

}

export default useVerify;