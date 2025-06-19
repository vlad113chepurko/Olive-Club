import axios from "axios";
import { useNavigate } from "react-router-dom";
import useErrorState from "../store/ErrorStore";
import useLoadingStore from "../store/LoadingStore";
const useRecovery = () => {

  const { loading, setLoading } = useLoadingStore()
  const { setError } = useErrorState()
  const navigate = useNavigate();

  const handleSetNewPassword = async (e, newPassword, repeatPassword, email) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (newPassword !== repeatPassword) {
        setError(true, "Passwords do not match!");
        setLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        setError(true, `Password must be at least 6 characters long.`);
        setLoading(false);
        return;
      }

      await axios.post("https://www.familyoliveclub.com/api/setNewPassword", { email, newPassword });
      alert("Password was successfully changed!");
      navigate("/form/login");
    } catch (err) {
      console.error("Ошибка установки пароля:", err);
      setError(true, "New password must be different from the old one.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSetNewPassword };
};

export default useRecovery;
