import "./Admin.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Admin() {
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const [isSearching, setIsSearching] = useState(false);

    const fetchVerifiedUsers = () => {
        axios.get('http://localhost:3000/api/admin/getUsers')
            .then((response) => setUsersData(response.data.users))
            .catch((err) => {
                console.error(err);
            });
    };

    const handleRemoveUser = (user) => {
        axios.post('http://localhost:3000/api/admin/removeUser', { email: user.email })
          .then(() => {
              setUsersData(prev => prev.filter(u => u.email !== user.email));
          })
          .catch((err) => {
              console.error(err);
          });
    };


    return (
        <div className="admin-container">

            <div className="admin-header">
                <button className="admin__button" type="button" onClick={fetchVerifiedUsers}>
                    Просмотреть всех юзеров
                </button>

                <button className="admin__button" type="button" onClick={() => navigate("/adminSurvey")}>
                    Просмотреть опрос юзера
                </button>
            </div>

            {usersData.length > 0 && (
                <div className="user-list">

                    <button className="admin__button" type="button" onClick={() => setIsSearching(true)}>Искать по почте</button>

                    {isSearching ? (
                      <div className="user-list">
                          <section className="search-box-config">
                              <button className="close__button" onClick={() => setIsSearching(false)}>Закрыть поиск по почте</button>
                              <input
                                className="shadow-2xl shadow-blue-950"
                                type="text"
                                placeholder="Поиск по email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                          </section>
                          <table>
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Имя</th>
                                      <th>Почта</th>
                                      <th>Номер телефона</th>
                                      <th>Роль</th>
                                  </tr>
                              </thead>
                              {usersData
                                .filter(user => user.email.toLowerCase().includes(searchQuery))
                                .map((user, index) => (
                                  <tbody>
                                      <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{user.name}</td>
                                          <td>{user.email}</td>
                                          <td>{user.phone}</td>
                                          <td>{user.role}</td>
                                          <td><button>Remove user</button></td>
                                      </tr>
                                  </tbody>
                                ))}
                          </table>
                      </div>
                    ) : (
                      <table>
                          <thead>
                              <tr>
                                  <th>#</th>
                                  <th>Имя</th>
                                  <th>Почта</th>
                                  <th>Номер телефона</th>
                                  <th>Роль</th>
                                  <th>Удалить юзера</th>
                              </tr>
                          </thead>
                          <tbody>
                              {usersData.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                      className="bg-red-400 p-1 hover:bg-red-500 cursor-pointer"
                                      onClick={() => handleRemoveUser(user)}>Remove user</button></td>
                                </tr>
                              ))}
                          </tbody>
                      </table>
                    ) }
                </div>
            )}
        </div>
    );
}
