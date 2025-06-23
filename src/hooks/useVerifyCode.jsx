import axios from "axios";
import useLoadingStore from "../store/LoadingStore";
import { useNavigate } from "react-router-dom";
import useErrorStore from "../store/ErrorStore";
import { useTranslation } from "react-i18next";

function useVerify() {

  const { i18n } = useTranslation();
  const { setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const { setError, clearError } = useErrorStore();

  const currentLang = i18n.language || 'en';

  const handleVerifyCode = async (e, email, code, setResendDisabled) => {
    e.preventDefault();
    setLoading(true);

    // 'https://www.familyoliveclub.com/api/form/verify',
    // 'http://localhost:3000/api/form/verify',

    try {
      await axios.post('http://localhost:3000/api/form/verify', {
        email,
        code,
      });

      clearError();
      navigate('/form/login');
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
      await axios.post('https://www.familyoliveclub.com/api/resendCode', {
        email,
        language: currentLang,
      });
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