import "./Admin.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useUserStore from "../store/UserStore.jsx";

export default function Admin() {
    const [usersData, setUsersData] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/form/login");
        }
    }, [user]);

    const fetchVerifiedUsers = () => {
        setTitle("Верифицированные пользователи")
        axios.get('http://localhost:3000/api/admin/getUsers')
            .then((response) => setUsersData(response.data.users))
            .catch((err) => {
                console.error(err);
            });
    };


    return (
        <div className="admin-container">
            <h1>Admin</h1>

            <button type="button" onClick={fetchVerifiedUsers}>
                Просмотреть всех юзеров
            </button>

            {usersData.length > 0 && (
                <div className="user-list">
                    <h2 className="text-3xl text-amber-50">{title}</h2>
                    <input
                        type="text"
                        placeholder="Поиск по email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {usersData
                        .filter(user => user.email.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
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
