
import "../styles/_Admin.scss"
import {useEffect, useState} from "react";
import axios from "axios";

function AdminSurvey() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/getUsers')
      .then(res => {
        setUserData(res.data.users);
      })
      .catch(err => console.error(err));
  })
  return (
    <div className="admin-container">
      <input
        className="shadow-2xl shadow-blue-950"
        placeholder="Поиск по email"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />

      {userData
        .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((user, index) => (
            <div className="user-container" key={index}>
              <p>User email: {user.email}</p>
              <button>Просмотреть опрос</button>
            </div>
        ))}
    </div>
  )
}

export default AdminSurvey;