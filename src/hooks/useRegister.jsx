import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoadingStore from "../store/LoadingStore";
import useUserStore from "../store/UserStore";
import useFormStore from "../store/FormStore";
import useErrorStore from "../store/ErrorStore";
import utils from "../utils/utils";

function useRegistration() {

  const navigate = useNavigate();
  const { removeValues } = useFormStore();
  const setUser = useUserStore((state) => state.setUser);
  const { loading, setLoading } = useLoadingStore();
  const { setError, clearError } = useErrorStore();

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
    }

    if (Object.keys(errors).length > 0) {
      console.debug("Errors:", errors);
      setLoading(false);
      return;
    }

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