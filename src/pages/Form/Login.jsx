import { useState } from 'react';
import axios from 'axios';
import "./Form.scss";
import Header from "../../components/Header/Header.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import useUserStore from "../../store/UserStore.jsx";

export default function Login() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                ...form,
                email: form.email.toLowerCase()
            });

            const userData = response.data?.user;
            if (!userData) throw new Error("Неверный ответ от сервера");

            const safeUser = {
                name: userData.name,
                email: userData.email,
                role: userData.isAdmin ? "admin" : "user",
            };

            setUser(safeUser);

            navigate(safeUser.role === 'admin' ? '/admin' : '/survey');
        } catch (err) {
            console.error("Ошибка входа:", err);
            alert(err.response?.data?.message || 'Ошибка авторизации');
        } finally {
            setLoading(false);
        }
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
                            <h1 className="text-white font-800 text-3xl mb-16 text-left">{t("login")}</h1>
                            <input
                                onChange={handleChange}
                                value={form.email}
                                type="text"
                                name="email"
                                placeholder={t("userMail")}
                                required
                                autoComplete="email"
                            />
                            <input
                                onChange={handleChange}
                                value={form.password}
                                type="password"
                                name="password"
                                placeholder={t("userPasswordLogin")}
                                required
                                autoComplete="current-password"
                            />
                            <section className="flex flex-col gap-5 justify-center w-full">
                                <button type="submit" disabled={loading}>
                                    {loading ? t("loading") : t("login")}
                                </button>
                                <button type="button" onClick={() => navigate('/registration')}>
                                    {t("registration_button")}
                                </button>
                            </section>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    );
}
