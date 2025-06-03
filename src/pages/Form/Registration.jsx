import { useState } from 'react'
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import useUserStore from "../../store/UserStore.jsx";
import validateRegistrationForm from '../../utils/regestrationValidator.js';
import './Form.scss';

export default function Registration() {

    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateRegistrationForm(form);
        if (Object.keys(errors).length > 0) {
            console.log("Ошибки:", errors);
        } else {
            console.log("Форма валидна:", form);
            localStorage.setItem('email', form.email);

            axios.post('http://localhost:3000/registration', form)
                .then(res => {
                    console.log("Server response: ", res.data)

                    const userData = res.data.user;

                    setUser({
                        name: userData.name,
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
                            <h1 className="text-white font-800 text-3xl mb-16 text-left">Регистрация</h1>
                            <input
                                onChange={handleChange}
                                value={form.name}
                                type="text"
                                name="name"
                                placeholder="Ваше имя"
                                required
                                autoComplete="username"/>
                            <input
                                onChange={handleChange}
                                value={form.email}
                                type="email"
                                name="email"
                                placeholder="Ваша почта"
                                required
                                autoComplete="email"/>
                            <input
                                onChange={handleChange}
                                value={form.password}
                                type="password"
                                name="password"
                                placeholder="Создайте пароль"
                                required
                                autoComplete="current-password"/>
                            <input
                                onChange={handleChange}
                                value={form.repeatPassword}
                                type="password"
                                name="repeatPassword"
                                placeholder="Повторите пароль"
                                required
                                autoComplete="current-password"/>
                            <section className="flex flex-col gap-5 justify-center w-full">
                                <button type="submit">Зарегистрироваться</button>
                                <button type="button" onClick={() => navigate('/login')}>У меня есть аккаунт</button>
                            </section>
                        </section>
                        <section className="form-vertical-container">
                            <div className="h-auto flex flex-col items-center justify-center mr-5">
                                <span className="horizontal-line"></span>
                                <p className="mt-14 mb-14">ИЛИ</p>
                                <span className="horizontal-line"></span>
                            </div>
                            <div className="flex flex-col gap-13 justify-center items-center h-auto w-auto">
                                <img src="/icons/facebook.svg" alt="facebook"/>
                                <img src="/icons/apple.svg" alt="apple" width="40px" height="40px"/>
                                <img src="/icons/google.svg" alt="google" width="40px" height="40px"/>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    )
}