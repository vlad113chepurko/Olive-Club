import useAdminUserDataStore from "../store/AdminUserDataStore";
import axios from "axios";
function  useRemoveUser() {

  const { removeUser } = useAdminUserDataStore();

  const  handleRemoveUser = async (email) => {
    removeUser(email);
    try {
      const res = await axios.post("http://localhost:3000/api/admin/removeUser", {
        email: email,
      });
      console.debug(res);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    handleRemoveUser,
  }


}

export default useRemoveUser;