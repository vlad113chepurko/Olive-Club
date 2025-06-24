import { useNavigate } from "react-router-dom";
import {motion} from "motion/react";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export default function SurveyHeader({ isFinished, count, questions }) {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    setIsMenu(false);
    i18n.changeLanguage(lang);
  }

  return (
    <div className="survey-header">

      <div className="header-item header-left">
        <img
          className="logo"
          onClick={() => navigate("/")}
          src="/assets/logo.svg"
          alt="logo"
        />
      </div>

      <div className="header-item header-center">
        <p className="survey-header-counter">
          {!isFinished ? count + 1 : questions.length} / {questions.length}
        </p>
      </div>

      <div className="header-item header-right">
        <div className="menu-wrapper">
          <button onClick={() => setIsMenu(prev => !prev)} className="menu-toggle">{t("lng")}</button>
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
    </div>
  );
}
