import './_Header.scss';
import { useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useEffect, useState} from "react";
import { motion} from "motion/react";

export default function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isMenu, setIsMenu] = useState(false);

    // Сделатть потом хук
    useEffect(() => {
      const savedLang = localStorage.getItem('i18nextLng');
      if (!savedLang) {
        localStorage.setItem('i18nextLng', 'en');
      }
    }, []);


  const changeLanguage = (lang) => {
        setIsMenu(false);
        i18n.changeLanguage(lang);
    }
    
  return (
    <header className="header">
      <div onClick={() => navigate('/')} className="header-logo">
        <img className="hover:cursor-pointer" src="/assets/logo.svg" alt="logo" width={214} height={40}/>
      </div>
        <div className="menu-wrapper">
            <button onClick={() => setIsMenu(prev => !prev)} className="menu-toggle">{t("lng")}</button>
            { isMenu && (
                <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{scale: 1}}
                    className="submenu">
                    <div onClick={() => changeLanguage('en')}>English</div>
                    <div onClick={() => changeLanguage('cn')}>中国人</div>
                    <div onClick={() => changeLanguage('sa')}>عربي</div>
                    <div onClick={() => changeLanguage('ru')}>Русский</div>
                </motion.div>
            )}
        </div>
    </header>
  )
}