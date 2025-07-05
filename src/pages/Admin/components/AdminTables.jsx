import components from "../../../components/index";
import adminComponents from "./index";
import useRemoveUser from "../../../hooks/useRemoveUser";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import dayjs from "dayjs";

function AdminTables({ userData, userSearch }) {
  const { handleRemoveUser } = useRemoveUser();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("old");

  const filteredUsers = userData.filter(user => user && (
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.phone.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
    dayjs(user.regDate).format("DD.MM.YY HH:mm:ss").toLowerCase().includes(userSearch.toLowerCase())
  ));

  if (filteredUsers.length === 0) {
    return <h2>Пользователи не найдены</h2>;
  }

  return (
    <div>
      <adminComponents.DownloadUsersButton />
      <adminComponents.AdminSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
            <th>Просмотреть опрос юзера</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredUsers.map((user, index) => (
            <tr key={user.email}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {dayjs(user.regDate).isValid()
                  ? dayjs(user.regDate).format("DD.MM.YY HH:mm:ss")
                  : "Дата не доступна"}
              </td>
              <td>
                <components.Button
                  className="admin-remove-btn"
                  onClick={() => handleRemoveUser(user.email)}
                >
                  Remove user
                </components.Button>
              </td>
              <td>
                <components.Button
                  className="admin-check-btn"
                  onClick={() => navigate(`/adminSurvey/${encodeURIComponent(user.email)}`)}
                >
                  Check survey
                </components.Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default AdminTables;