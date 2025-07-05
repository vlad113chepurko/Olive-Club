import axios from "axios";
import useAdminUserDataStore from "../store/AdminUserDataStore";

const useGetUsers = () => {
  const { setUserData } = useAdminUserDataStore();

  function getUsers(sortOrder ) {

    // https://www.familyoliveclub.com/api/admin/getUsers
    // http://localhost:3000/api/admin/getUsers
    axios
      .get(`http://localhost:3000/api/admin/getUsers?sort=${sortOrder}`)
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