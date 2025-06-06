import { useState } from 'react'
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header.jsx";
import useUserStore from "../../store/UserStore.jsx";
import validateRegistrationForm from '../../utils/regestrationValidator.js';
import './Form.scss';

export default function Registration() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateRegistrationForm(form);
        if (Object.keys(errors).length > 0) {
            console.debug("Ошибки:", errors);
        } else {
            console.debug("Форма валидна:", form);
            localStorage.setItem('email', form.email);

            axios.post('http://localhost:3000/api/registration', form)
                .then(res => {
                    console.debug("Server response: ", res.data)

                    const userData = res.data.user;

                    setUser({
                        name: userData.name,
                        lastName: userData.lastName,
                        email: userData.email,
                        role:  userData.isAdmin ? "admin" : "user",
                    })
                    navigate('/verify');
                })
                .catch(err => {
                    alert(err.response?.data?.message || 'Ошибка при регистрации');
                });
        }

    }

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
                <form className="form-login"  onSubmit={handleSubmit}>
                    <div className="form-inside-container">
                        <section className="form-inside-container-left">
                            <h1 className="text-white font-800 text-3xl mb-16 text-left">{t('registration')}</h1>
                            <input
                                onChange={handleChange}
                                value={form.name}
                                type="text"
                                name="name"
                                placeholder={t("userFirstName")}
                                required
                                autoComplete="username"/>
                            <input
                                onChange={handleChange}
                                value={form.lastName}
                                type="text"
                                name="lastName"
                                placeholder={t("userLastName")}
                                required
                                autoComplete="family-name"/>
                            <input
                                onChange={handleChange}
                                value={form.email}
                                type="email"
                                name="email"
                                placeholder={t("userMail")}
                                required
                                autoComplete="email"/>
                            <input
                                onChange={handleChange}
                                value={form.password}
                                type="password"
                                name="password"
                                placeholder={t("userPassword")}
                                required
                                autoComplete="current-password"/>
                            <input
                                onChange={handleChange}
                                value={form.repeatPassword}
                                type="password"
                                name="repeatPassword"
                                placeholder={t("userRepPassword")}
                                required
                                autoComplete="current-password"/>
                            <section className="flex flex-col gap-5 justify-center w-full">
                                <button type="submit">{t("registration_button")}</button>
                                <button type="button" onClick={() => navigate('/login')}>{t("userHasAnAccount")}</button>
                            </section>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    )
}