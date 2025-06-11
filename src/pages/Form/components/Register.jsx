import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAxios  from "../../hooks/userAxios";

import useFormStore from "../../store/FormStore";
import './styles/Form.scss';
import components from "../../components/index";

export default function Register() {
    const { t } = useTranslation();
    const { handleSubmitRegistration } = useAxios();
    const { form, setForm } =  useFormStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ [name]: value });
    }

    return (
        <form className="form-login"  onSubmit={(e) => handleSubmitRegistration(e, form)}>
            <article className="form-article">
                <h2>{t("formTitle")}</h2>
                <p>{t("formUnderTitle")}</p>
            </article>
            <div className="form-inside-container">
                <section className="form-inside-container-left">
                    <h1>{t('registration')}</h1>

                    <components.Input
                      name="name"
                      holder={t("userFirstName")}
                      value={form.name} func={handleChange} complete="username" required />

                    <components.Input
                      name="lastName"
                      holder={t("userLastName")}
                      value={form.lastName} func={handleChange} complete="family-name" required />

                    <components.Input
                      type="email"
                      name="email"
                      holder={t("userMail")}
                      value={form.email} func={handleChange} complete="email" required />

                    <components.Input
                      name="phone"
                      holder={t("userPhone")}
                      value={form.phone} func={handleChange} complete="tel" required />

                    <components.Input
                      type="password"
                      name="password"
                      holder={t("userPassword")}
                      value={form.password} func={handleChange} complete="new-password" required />

                    <components.Input
                      type="password"
                      name="repeatPassword"
                      holder={t("userRepPassword")}
                      value={form.repeatPassword} func={handleChange} complete="new-password" required />

                    <section className="form-section-buttons">
                        <components.Button
                          className={"form-button"} type="submit">
                            {t("registration_button")}
                        </components.Button>
                        <components.Button
                          className={"form-sign-up-button"}
                          onClick={()  => navigate("/form/login")}>
                            {t("userHasAnAccount")}
                        </components.Button>
                    </section>
                </section>
            </div>
        </form>
    )
}