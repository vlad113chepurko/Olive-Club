import useSendTimer from "../../../hooks/useSendTimer";
import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import components from "../../../components/index";


export default function Verify() {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();
    const [resendDisabled, setResendDisabled] = useState(false);

    useEffect(() => {
        if (!email) return;
        axios.get("http://localhost:3000/api/getVerifyUser", {
            params: { email }
        })
          .then(res => {
              if (res.data.isVerified) {
                  navigate("/form/login");
              }
          })
          .catch(err => {
              console.log("Ошибка проверки верификации:", err);
          });
    }, [email]);

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if(savedEmail) setEmail(savedEmail);
        localStorage.removeItem('email');
    }, []);

    useSendTimer(setTimer, resendDisabled, setResendDisabled);
    const {
        handleResendCode,
        handleVerifyCode,
    } = useAxios();

    return (
        <form className="form-login"
              onSubmit={(e) => handleVerifyCode(e, email, code, setResendDisabled)}>
            <article className="form-article">
                <h2>{t("formTitle")}</h2>
                <p>{t("formUnderTitle")}</p>
            </article>
            <div className="form-inside-container">
                <section className="form-inside-container-left">
                    <h1>{t("verify")}</h1>
                    <section className="form-inputs-container">
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
                    </section>
                    <section className="form-section-buttons">
                        <components.Button
                          onClick={() => handleResendCode(email, setResendDisabled)}
                          disabled={resendDisabled}
                          className={"form-button"}>{resendDisabled ? `${t("resendCode")} (${timer})` : t("resendCode")}</components.Button>
                        <components.Button
                          type={"submit"}
                          className={"form-button"}>{t("confirm")}</components.Button>
                    </section>
                </section>
            </div>
        </form>
    );
}
