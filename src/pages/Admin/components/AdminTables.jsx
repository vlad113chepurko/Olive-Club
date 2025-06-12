import components from "../../../components/index";

function AdminTables( { userData, userSearch, setUserData } ) {

  return (
    <table className="table">
      <thead className="table-header">
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Почта</th>
          <th>Номер телефона</th>
          <th>Удалить юзера</th>
        </tr>
      </thead>
      {userData
        .filter((user) => user.email.toLowerCase().includes(userSearch.toLowerCase()))
        .map((user, index) => (
        <tbody className="table-body" key={index}>
          <tr>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <components.Button>Remove user
              </components.Button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  )
}

export default AdminTables;