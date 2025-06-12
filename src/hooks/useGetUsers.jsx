import axios from "axios";
import useAdminUserDataStore from "../store/AdminUserDataStore";

const useGetUsers = () => {
  const { setUserData } = useAdminUserDataStore();

  function getUsers() {
    axios
      .get("http://localhost:3000/api/admin/getUsers")
      .then((res) => {
        console.log("Res data: ", res.data.users);
        setUserData(res.data.users);
      })
      .catch((err) => {
        console.error("Ошибка при получении юзеров:", err);
      });
  }

  return getUsers;
};

export default useGetUsers;