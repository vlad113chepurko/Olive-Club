import utils from "../utils/utils";
import axios from "axios";
import useUserStore from "../store/UserStore";
import useFormStore from "../store/FormStore";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

function useAxios() {

  const { removeValues }  = useFormStore();
  const navigate = useNavigate();
  const [ loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmitRegistration = (e, form, isPrivacy) => {
    e.preventDefault();
    const errors = utils.validator(form);
    if(isPrivacy) {
      if (Object.keys(errors).length > 0) {
        console.debug("Ошибки:", errors);
      } else {
        console.debug("Форма валидна:", form);
        localStorage.setItem('email', form.email);
        removeValues();

        axios.post('http://localhost:3000/api/form/registration', form)
          .then(res => {
            console.debug("Server response: ", res.data)

            const userData = res.data.user;

            setUser({
              name: userData.name,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              role:  userData.isAdmin ? "admin" : "user",
            })

            navigate('/form/verify')
          })
          .catch(err => {
            alert(err.response?.data?.message || 'Error during registration');
          });
      }
    } else {
      console.error("Privacy error");
    }
  }
  const handleSubmitLogin = async (e, form) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/form/login', {
        ...form,
        email: form.email.toLowerCase()
      });

      removeValues();

      const userData = response.data?.user;
      if (!userData) throw new Error("Неверный ответ от сервера");

      const safeUser = {
        name: userData.name,
        email: userData.email,
        role: userData.isAdmin ? "admin" : "user",
      };

      setUser(safeUser);

      navigate(safeUser.role === 'admin' ? '/admin' : '/success');
    } catch (err) {
      console.error("Ошибка входа:", err);
      alert(err.response?.data?.message || 'Ошибка авторизации');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmitRegistration,
    handleSubmitLogin,
  }
}

export default useAxios;