// components & store
import components from "../../../components/index";
import useFormStore from "../../../store/FormStore";

// hooks
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import useLogin from "../../../hooks/useLogin";

export default function Login() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {form, setForm} = useFormStore();
  const [loading] = useState(false);
  const {handleSubmitLogin} = useLogin();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({[name]: value})
  };

  return (
    <form
      className="form-login"
      onSubmit={(e) => handleSubmitLogin(e, form)}
    >
      <article className="form-article">
        <h2>{t("loginTitle")}</h2>
      </article>
      <div className="form-inside-container">
        <section className="form-inside-container-left">
          <h1>{t("login")}</h1>
          <section className="form-inputs-container">
            <components.Input
              name="email"
              holder={t("userMail")}
              value={form.email}
              func={handleChange}
              autoCompelete="email"
            />

            <components.Input
              type="password"
              name="password"
              holder={t("userPasswordLogin")}
              value={form.password}
              func={handleChange}
              autoCompelete="current-password"
            />
          </section>
          <section className="form-section-buttons">
            <components.Button
              className={"form-button"}
              type="submit"
              disabled={loading}
            >
              {loading ? t("loading") : t("login")}
            </components.Button>
            <components.Button
              className={"form-sign-up-button"}
              onClick={() => navigate("/form/registration")}
            >
              {t("log_button")}
            </components.Button>
            <components.Button
              className={"form-sign-up-button"}
              onClick={() => navigate("/form/recovery")}
            >
              {t('rec_pass')}
            </components.Button>
          </section>
        </section>
      </div>
    </form>
  );
}
