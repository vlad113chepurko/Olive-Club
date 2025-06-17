import useAdminUserDataStore from "../store/AdminUserDataStore";
import axios from "axios";
function  useRemoveUser() {

  const { removeUser } = useAdminUserDataStore();

  const  handleRemoveUser = async (email) => {
    const confirmed = confirm("Are you sure you want to remove this user?");
    if (!confirmed) {
     return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/admin/removeUser", {
        email: email,
      });
      console.debug(res);
      removeUser(email);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    handleRemoveUser,
  }


}

export default useRemoveUser;