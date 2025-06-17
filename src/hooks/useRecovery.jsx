import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLoadingStore from "../store/LoadingStore";
const useRecovery = () => {

  const { loading, setLoading } = useLoadingStore()
  const navigate = useNavigate();

  const handleSetNewPassword = async (e, newPassword, repeatPassword, email) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (newPassword !== repeatPassword) {
        alert("Passwords do not match!");
        setLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:3000/api/setNewPassword", { email, newPassword });
      alert("Password was successfully changed!");
      navigate("/form/login");
    } catch (err) {
      console.error("Ошибка установки пароля:", err);
      alert("New password must be different from the old one.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSetNewPassword };
};

export default useRecovery;
