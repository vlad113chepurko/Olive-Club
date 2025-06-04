import { useState } from 'react';
import axios from 'axios';
import "./Form.scss";
import Header from "../../components/Header/Header.jsx";
import { useNavigate } from 'react-router-dom';
import useUserStore from "../../store/UserStore.jsx";

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', form)
            .then((res) => {
                console.log("Server response: ", res.data);

                const userData = res.data.user;

                const safeUser = {
                    name: userData.name,
                    email: userData.email,
                    role: userData.isAdmin ? "admin" : "user",
                };

                setUser(safeUser);

                if (safeUser.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/survey');
                }
            })
            .catch(err => {
                console.error("Error with send: ", err);
                alert(err.response?.data?.message || 'Ошибка авторизации');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    return (
        <div className="form-wrapper">
            <Header />
            <div className="form-bg"></div>
            <div className="form-container">
                <form className="form-login" onSubmit={handleSubmit}>
                    <div className="form-inside-container">
                        <section className="form-inside-container-left">
                            <h1 className="text-white font-800 text-3xl mb-16 text-left">Войти</h1>
                            <input
                                onChange={handleChange}
                                value={form.email}
                                type="text"
                                name="email"
                                placeholder="Ваша почта"
                                required
                                autoComplete="email"
                            />
                            <input
                                onChange={handleChange}
                                value={form.password}
                                type="password"
                                name="password"
                                placeholder="Ваш пароль"
                                required
                                autoComplete="current-password"
                            />
                            <section className="flex flex-col gap-5 justify-center w-full">
                                <button type="submit">Войти</button>
                                <button type="button" onClick={() => navigate('/registration')}>
                                    Зарегистрироваться
                                </button>
                            </section>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    );
}
