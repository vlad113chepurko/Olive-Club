import components from "../../../components/index";
import useRemoveUser from "../../../hooks/useRemoveUser";
import DownloadUsersButton from "./DownloadUsersButton";
import dayjs from "dayjs";
function AdminTables( { userData, userSearch } ) {

  const { handleRemoveUser } = useRemoveUser();
  return (
    <div>
      <DownloadUsersButton />
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Почта</th>
            <th>Номер телефона</th>
            <th>Дата регистрации</th>
            <th>Удалить юзера</th>
          </tr>
        </thead>
        {userData
          .filter((user) =>
            user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
            user.phone.toLowerCase().includes(userSearch.toLowerCase()) ||
            user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
            user.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
            user.regDate.toLowerCase().includes(userSearch.toLowerCase())
          )
          .map((user, index) => (
            <tbody className="table-body" key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{dayjs(user.regDate).format("DD.MM.YY HH:mm:ss")}</td>
                <td>
                  <components.Button
                    className="admin-remove-btn"
                    onClick={() => handleRemoveUser(user.email)}>Remove user
                  </components.Button>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  )
}

export default AdminTables;