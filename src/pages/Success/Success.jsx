import "./styles/_Success.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Success() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="success-wrapper">
            <div className="success-bg"></div>
            <div className="success">
                <h1 className="success-h1">{t("successTitle")}</h1>
                <p>{t("successUnderTitle")}</p>
                <img className="success-logo" src="/assets/logo-success.svg" alt="logo"/>
                <button className="success-btn " onClick={() => navigate('/')}>{t("successCloseButton")}</button>
            </div>
        </div>
    )
}

export default Success;