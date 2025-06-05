import axios from "axios";
import Header from "../../components/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function Verify() {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if(savedEmail) setEmail(savedEmail);
        localStorage.removeItem('email');
    }, []);

    const handleResendCode = async () => {
        try {
            const response = await axios.post('http://localhost:3000/resend-code', {
                email
            });

        } catch (error) {
            console.error('Ошибка отправки кода:', error);
            setResendMessage(error.response?.data?.message || 'Ошибка при отправке кода');
        }
    }
    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/verify', {
                email,
                code
            });

            setMessage(response.data.message);
            navigate('/login')
        } catch (error) {
            console.error('Ошибка подтверждения:', error);
            setMessage(error.response?.data?.message || 'Ошибка при подтверждении');
        }
    };

    return (
        <div className="form-wrapper">
            <Header />
            <div className="form-bg"></div>
            <div className="form-container">
                <form className="form-login"  onSubmit={handleVerify}>
                    <div className="form-inside-container">
                        <section className="form-inside-container-left">
                            <h1 className="text-white font-800 text-3xl mb-16 text-left">{t("verify")}</h1>
                            <input
                                type="email"
                                placeholder={t("userMail")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder={t("code")}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                            <section className="flex flex-col gap-5 justify-center w-full">
                                <button type="submit">{t("confirm")}</button>
                                <button type="button" onClick={handleResendCode}>
                                    {t("resendCode")}
                                </button>
                            </section>
                            {message && <p>{message}</p>}
                            {resendMessage && <p>{resendMessage}</p>}
                        </section>
                    </div>
                </form>
            </div>
        </div>
    );
}
