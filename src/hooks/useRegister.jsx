import axios from "axios";
import useLoadingStore from "../store/LoadingStore";
import useUserStore from "../store/UserStore";
import useFormStore from "../store/FormStore";
import useErrorStore from "../store/ErrorStore";
import utils from "../utils/utils";

import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";

function useRegistration() {

  const navigate = useNavigate();
  const { removeValues } = useFormStore();
  const setUser = useUserStore((state) => state.setUser);
  const { loading, setLoading } = useLoadingStore();
  const { setError, clearError } = useErrorStore();

  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const handleSubmitRegistration = async (e, form, isPrivacy) => {
    e.preventDefault();

    setLoading(true);

    const dataToSend = {
      ...form,
      phone: '+' + form.phone,
    };

    const errors = utils.validator(form);

    if (!isPrivacy) {
      setLoading(false);
      setError(true, "Please confirm the privacy policy to proceed.")
      return;
    }

    if (Object.keys(errors).length > 0) {
      setError(true, "Fill in the required fields");
      setLoading(false);
      return;
    }

    // https://www.familyoliveclub.com/api/form/registration
    // http://localhost:3000/api/form/registration

    try {
      const res = await axios.post('https://www.familyoliveclub.com/api/form/registration', dataToSend);
      const userData = res.data.user;

      localStorage.setItem('email', form.email);
      removeValues();
      clearError();

      setUser({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        regDate: userData.regDate,
        language: currentLang,
        role: userData.isAdmin ? "admin" : "user",
      });

      navigate('/form/verify');
    } catch (err) {
      const message = err?.response?.data?.message || "Registration error.";
      setError(true, message);
    } finally {
      setLoading(false);
    }
  };

  return handleSubmitRegistration;
}

export default useRegistration;