import "./styles/_Admin.scss";
import useGetUsers from "../../hooks/useGetUsers";
import components from "./components/index";
import useAdminUserDataStore from "../../store/AdminUserDataStore";
import {useEffect} from "react";

export default function Admin() {
  const {userSearch, userData, setUserData} = useAdminUserDataStore();
  const getUsers = useGetUsers();

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="admin-wrapper">
      <div className="admin-bg"></div>
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <components.AdminInput/>
        {userData.length > 0 ? (
          <components.AdminTables
            userSearch={userSearch}
            userData={userData}
            setUserData={setUserData}
          />
        ) : (
          <h1>Пользователей в списке пока что нету.</h1>
        )}

      </div>
    </div>
  );
}
