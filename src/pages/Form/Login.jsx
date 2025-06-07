import { useState } from 'react';
import axios from 'axios';
import "./Form.scss";
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
            const response = await axios.post('http://localhost:3000/api/form/login', {
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

            navigate(safeUser.role === 'admin' ? '/admin' : '/success');
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
        <form className="form-login" onSubmit={handleSubmit}>
            <article className="form-article">
                <h2>{t("formTitle")}</h2>
                <p>{t("fromUnderTitle")}</p>
            </article>
            <div className="form-inside-container">
                <section className="form-inside-container-left">
                    <h1>{t("login")}</h1>
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
                        <button className="form-button" type="submit" disabled={loading}>
                            {loading ? t("loading") : t("login")}
                        </button>
                        <button className="form-sign-up-button" type="button" onClick={() => navigate('/form/registration')}>
                            {t("log_button")}
                        </button>
                    </section>
                </section>
            </div>
        </form>
    );
}
