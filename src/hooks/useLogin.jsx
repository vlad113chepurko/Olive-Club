import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoadingStore from "../store/LoadingStore";
import useUserStore from "../store/UserStore";
import useFormStore from "../store/FormStore";
import useErrorStore from "../store/ErrorStore";

function useLogin() {
  const navigate = useNavigate();
  const { removeValues } = useFormStore();
  const setUser = useUserStore((state) => state.setUser);
  const { setLoading } = useLoadingStore();
  const { setError, clearError } = useErrorStore();

  const handleSubmitLogin = async (e, form) => {
    e.preventDefault();
    setLoading(true);

    const email = form.email.toLowerCase();

    // 'https://www.familyoliveclub.com/api/form/login',
    // 'http://localhost:3000/api/form/login',

    try {
      const response = await axios.post(
        'https://www.familyoliveclub.com/api/form/login',
        { ...form, email }
      );

      const userData = response.data.user;

      if (!userData) throw new Error("Empty user data from server.");

      if (userData.isVerified === false) {
        localStorage.setItem('email', email);
        navigate("/form/verify");
        return;
      }

      setUser({
        name: userData.name,
        email: userData.email,
        role: userData.isAdmin ? "admin" : "user",
      });

      removeValues();
      clearError();

      if (userData.isAdmin) {
        navigate("/admin");
      } else if (userData.hasPassedTest) {
        navigate("/success");
      } else {
        navigate("/survey");
      }

    } catch (err) {
      const res = err.response;

      if (res?.status === 403 && res?.data?.redirect) {
        localStorage.setItem('email', form.email.toLowerCase());
        navigate(res.data.redirect);
        return;
      }

      console.error("Login error:", err);
      setError(true, res?.data?.message || "Authorization error");
    } finally {
      setLoading(false);
    }
  };

  return handleSubmitLogin;
}

export default useLogin;
