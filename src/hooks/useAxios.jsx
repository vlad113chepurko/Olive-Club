import utils from "../utils/utils";
import axios from "axios";
import useUserStore from "../store/UserStore";
import useFormStore from "../store/FormStore";
import { useNavigate } from "react-router-dom";

function useAxios() {
  const { removeValues } = useFormStore();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmitRegistration = async (e, form, isPrivacy, selected) => {
    e.preventDefault();

    const normalizePhone = (phone, prefix) => {
      if (phone.startsWith(prefix)) return phone;
      if (phone.startsWith('+')) return phone;
      return `${prefix}${phone}`;
    };

    const fullPhone = normalizePhone(form.phone, selected.prefix);
    console.log(fullPhone);

    const formToSend = {
      ...form,
      phone: fullPhone,
    };

    const errors = utils.validator(form);

    if (!isPrivacy) return alert("Подтверди политику!");

    if (Object.keys(errors).length > 0) {
      console.debug("Ошибки:", errors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/form/registration', formToSend);
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
      alert(err.response?.data?.message || 'Ошибка регистрации');
    }
  };

  const handleSubmitLogin = async (e, form, setLoading) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/form/login', {
        ...form,
        email: form.email.toLowerCase(),
      });

      const userData = response.data.user;
      if (!userData) throw new Error("Сервер вернул пустые данные");

      setUser({
        name: userData.name,
        email: userData.email,
        role: userData.isAdmin ? "admin" : "user",
      });

      removeValues();

      navigate(userData.isAdmin ? "/admin" : "/success");
    } catch (err) {
      console.error("Ошибка входа:", err);
      alert(err.response?.data?.message || 'Ошибка авторизации');
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

    try {
      const response = await axios.post('http://localhost:3000/api/form/verify', {
        email,
        code,
      });

      if (response.status === 200) {
        navigate('/form/login');
      } else {
        setResendDisabled(false);
      }
    } catch (error) {
      console.error('Ошибка подтверждения:', error?.response?.data || error.message);
      setResendDisabled(false);
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