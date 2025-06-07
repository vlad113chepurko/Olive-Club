import axios from "axios";
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
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if(savedEmail) setEmail(savedEmail);
        localStorage.removeItem('email');
    }, []);

    useEffect(() => {
        let interval = null;

        if (resendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [resendDisabled, timer]);

    const handleResendCode = async () => {
        if (resendDisabled) return;

        try {
            await axios.post('http://localhost:3000/api/resendCode', { email });
            setResendMessage('Код отправлен повторно');
            setResendDisabled(true);
            setTimer(60);
        } catch (error) {
            console.error('Ошибка отправки кода:', error);
            setResendMessage(error.response?.data?.message || 'Ошибка при отправке кода');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/form/verify', {
                email,
                code
            });

            setMessage(response.data.message);
            navigate('/form/login')
        } catch (error) {
            console.error('Ошибка подтверждения:', error);
            setMessage(error.response?.data?.message || 'Ошибка при подтверждении');
        }
    };

    return (
        <form className="form-login"  onSubmit={handleVerify}>
            <article className="form-article">
                <h2>{t("formTitle")}</h2>
                <p>{t("fromUnderTitle")}</p>
            </article>
            <div className="form-inside-container">
                <section className="form-inside-container-left">
                    <h1>{t("verify")}</h1>
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
                        <button className="form-button" type="submit">{t("confirm")}</button>
                        <button className="form-button" type="button" onClick={handleResendCode}>
                            {t("resendCode")}
                        </button>
                    </section>
                    {message && <p className="mt-5 text-red-400">{message}</p>}
                    {resendMessage && <p className="mt-5 text-red-400">{resendMessage}</p>}
                </section>
            </div>
        </form>
    );
}
