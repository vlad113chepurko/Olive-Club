import utils from "../utils/utils";
import axios from "axios";
import useUserStore from "../store/UserStore";
import useFormStore from "../store/FormStore";
import useLoadingStore from "../store/LoadingStore";
import { useNavigate } from "react-router-dom";

function useAxios() {
  const { removeValues } = useFormStore();
  const { loading, setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmitRegistration = async (e, form, isPrivacy, selected) => {
    e.preventDefault();

    setLoading(true);

    const dataToSend = {
      ...form,
      phone: '+' + form.phone,
    };

    const errors = utils.validator(form);

    if (!isPrivacy) {
      setLoading(false);
      return alert("Please confirm the privacy policy to proceed.")
    }

    if (Object.keys(errors).length > 0) {
      console.debug("Errors:", errors);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/form/registration', dataToSend);
      const userData = res.data.user;

      localStorage.setItem('email', form.email);
      removeValues();

      setUser({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: userData.isAdmin ? "admin" : "user",
      });

      navigate('/form/verify');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration error.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e, form) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/form/login', {
        ...form,
        email: form.email.toLowerCase(),
      });

      const userData = response.data.user;

      if (!userData) throw new Error("The server returned empty data.");

      if (response.status === 403 || userData.isVerified === false) {
        localStorage.setItem('email', form.email.toLowerCase());
        navigate("/form/verify");
        return;
      }

      setUser({
        name: userData.name,
        email: userData.email,
        role: userData.isAdmin ? "admin" : "user",
      });

      removeValues();
      navigate(userData.isAdmin ? "/admin" : "/success");
    } catch (err) {
      const res = err.response;

      if (res?.status === 403 && res?.data?.redirect) {
        localStorage.setItem('email', form.email.toLowerCase());
        navigate(res.data.redirect);
        return;
      }

      console.error("Login error:", err);
      alert(res?.data?.message || 'Authorization error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async (email, setResendDisabled) => {
    try {
      await axios.post('http://localhost:3000/api/resendCode', { email });
    } catch (error) {
      console.error('Ошибка отправки кода:', error);
      setResendDisabled(false);
    }
  };

  const handleVerifyCode = async (e, email, code, setResendDisabled) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/form/verify', {
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
      console.error('Confirmation error:', error?.response?.data || error.message);
      setResendDisabled(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmitRegistration,
    handleSubmitLogin,
    handleResendCode,
    handleVerifyCode,
  };
}


export default useAxios;