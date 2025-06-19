import { useState, useEffect } from "react";
import useRecovery from "../../../hooks/useRecovery";
import components from "../../../components";
import { useTranslation } from "react-i18next";
import axios from "axios";


function Recovery() {
  const [isSent, setIsSent] = useState(false);
  const [isNewPas, setIsNewPas] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeRes, setCodeRes] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { t } = useTranslation();

  const {
    handleSetNewPassword,
  } = useRecovery();



  const handleSendCode = (e) => {
    e.preventDefault();
    try {
      const res = axios.post("https://www.familyoliveclub.com/api/resendCode", { email });
      setCodeRes(res.data)
      setIsSent(true);
    } catch (err) {
      console.error("Ошибка отправки кода:", err);
      alert("Error with code");
    }
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://www.familyoliveclub.com/api/confirmCode", { email, code });
      setIsNewPas(true);
    } catch (err) {
      alert("Code is not correct!");
    }
  };

  useEffect(() => {
    console.log("isSent тепер:", isSent);
  }, [isSent]);

  return (
    <form className={"form-login"}>
      <article className="form-article">
        <h2>{t("formTitle")}</h2>
        <p>{t("formUnderTitle")}</p>
      </article>
      <div className="form-inside-container">
          {isNewPas ? (
            <section className="form-inside-container-left">
              <h1>{t("userPassword")}</h1>
              <div className="form-inputs-container">
                <components.Input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  func={(e) => setNewPassword(e.target.value)}
                  holder={t("userNewPassword")}
                  complete="new-password"
                />
                <components.Input
                  type="password"
                  name="repeatPassword"
                  value={repeatPassword}
                  func={(e) => setRepeatPassword(e.target.value)}
                  holder={t("userRepPassword")}
                  complete="new-password"
                  minLength={6}
                  maxLength={20}
                />
              </div>
              <div className="form-section-buttons">
                <components.Button
                  type="button"
                  className={"form-button"}
                  onClick={ (e) =>
                    handleSetNewPassword(e, newPassword, repeatPassword, email
                    )}
                >
                  {t("userSetNewPassword")}
                </components.Button>
              </div>
            </section>
          ) : isSent ? (
            <section className="form-inside-container-left">
              <h1>{t("verify")}</h1>
              <div className="form-inputs-container">
                <components.Input
                  type="text"
                  name="code"
                  value={code}
                  func={(e) => setCode(e.target.value)}
                  holder={t("code")}
                  complete="one-time-code"
                />
               </div>
              <div className="form-section-buttons">
                <components.Button
                  type="button"
                  className={"form-button"}
                  onClick={(e) => handleConfirmCode(e)}
                >
                  {t("verify")}
                </components.Button>
                <components.Button
                  type="button"
                  className={"form-button"}>
                  {t("resendCode")}
                </components.Button>
              </div>
            </section>
          ) : (
            <section className="form-inside-container-left">
              <h1> {t("verify")}</h1>
              <div className="form-inputs-container">
                <components.Input
                  type="email"
                  name="email"
                  value={email}
                  func={(e) => setEmail(e.target.value)}
                  holder={t("userMail")}
                  complete="email"
                />
              </div>
              <div className="form-section-buttons">
                <components.Button
                  type="button"
                  className={"form-button"}
                  onClick={(e) => handleSendCode(e)}
                >
                  {t("sendCode")}
                </components.Button>
              </div>
            </section>
          )}
      </div>
    </form>
  );
}

export default Recovery;
