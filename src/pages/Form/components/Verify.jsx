import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import components from "../../components/index";

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
        let interval;
        if (resendDisabled) {
            setTimer(30);
            interval = setInterval(() => {
                setTimer((prev) => {
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
    }, [resendDisabled]);

    const handleResendCode = async () => {

        setResendDisabled(true);

        try {
            await axios.post('http://localhost:3000/api/resendCode', { email });
            setResendMessage(t("verifyResendMessage"));
        } catch (error) {
            console.error('Ошибка отправки кода:', error);
            setResendMessage(error.response?.data?.message || 'Ошибка при отправке кода');
            setResendDisabled(false);
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
            setResendDisabled(false);
        }
    };

    return (
        <form className="form-login"  onSubmit={handleVerify}>
            <article className="form-article">
                <h2>{t("formTitle")}</h2>
                <p>{t("formUnderTitle")}</p>
            </article>
            <div className="form-inside-container">
                <section className="form-inside-container-left">
                    <h1>{t("verify")}</h1>
                    <components.Input
                    type={"email"}
                    holder={t("userMail")}
                    value={email}
                    func={(e) => setEmail(e.target.value)}
                    autoComplete={"email"}
                    required
                    />
                    <components.Input
                      holder={t("code")}
                      value={code}
                      func={(e) => setCode(e.target.value)}
                      autoComplete={"email"}
                      required
                    />
                    <section className="form-section-buttons">
                        <components.Button
                          onClick={handleResendCode}
                          disabled={resendDisabled}
                          className={"form-button"}>{resendDisabled ? `${t("resendCode")} (${timer})` : t("resendCode")}</components.Button>
                        <components.Button
                          type={"submit"}
                          className={"form-button"}>{t("confirm")}</components.Button>
                    </section>
                    {message && <p>{message}</p>}
                    {resendMessage && <p>{resendMessage}</p>}
                </section>
            </div>
        </form>
    );
}
