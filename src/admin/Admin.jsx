import "./Admin.scss";
import axios from "axios";
import { useState } from "react";

export default function Admin() {
    const [usersData, setUsersData] = useState([]);
    const [title, setTitle] = useState("");

    const fetchVerifiedUsers = () => {
        setTitle("Верифицированные пользователи")
        axios.post('http://localhost:3000/admin/verified-users')
            .then((response) => setUsersData(response.data.users)) // получаем только массив
            .catch((err) => {
                console.error(err);
            });
    };

    const fetchUnVerifiedUsers = () => {
        setTitle("Не верифицированные пользователи")
        axios.post('http://localhost:3000/admin/unverified-users')
            .then((response) => setUsersData(response.data.users)) // получаем только массив
            .catch((err) => {
                console.error(err);
            });
    };


    return (
        <div className="admin-container">
            <h1>Admin</h1>

            <button type="button" onClick={fetchVerifiedUsers}>
                Просмотреть всех юзеров с верификацией
            </button>

            <button type="button" onClick={fetchUnVerifiedUsers}>
                Просмотреть всех юзеров без верификации
            </button>

            {usersData.length > 0 && (
                <div className="user-list">
                    <h2 className="text-3xl text-amber-50">{title}</h2>
                    <input type="text" placeholder="find user by e-mail"/>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Роль</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersData.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
