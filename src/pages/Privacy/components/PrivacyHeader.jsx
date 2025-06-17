import "../../Form/styles/_FormHeader.scss";
import "../../../components/Header/_Header.scss";
import "../styles/_Privacy.scss";
import { useTranslation } from "react-i18next";
import { useNavigate} from "react-router-dom";
import {motion} from "motion/react";
import {useState} from "react";

function PrivacyHeader() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isMenu, setIsMenu] = useState(false);

    const changeLanguage = (lang) => {
        setIsMenu(false);
        i18n.changeLanguage(lang);
    }

    return (
        <div className="header-privacy">
            <div onClick={() => navigate('/')} className="privacy-logo">
                <img className="form-header-logo" src='/assets/logo-privacy01.svg' alt="logo" width={214} height={40}/>
            </div>
            <div className="menu-wrapper">
                <button onClick={() => setIsMenu(prev => !prev)} className="menu-toggle-privacy">{t("lng")}</button>
                { isMenu && (
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{scale: 1}}
                        className="submenu">
                        <div onClick={() => changeLanguage('en')}>English</div>
                        <div onClick={() => changeLanguage('cn')}>CN</div>
                        <div onClick={() => changeLanguage('sa')}>SA</div>
                        <div onClick={() => changeLanguage('ru')}>Русский</div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PrivacyHeader;