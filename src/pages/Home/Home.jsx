import './Home.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from "../../components/Header/Header.jsx";

function Home() {
    const { t } = useTranslation();
    return (
        <div className="home-wrapper">
            <Header />
            <div className="home">
                <div className="merge-blocks">
                    <div className="left-block">
                        <div className="left-block-title">
                         Family
                        </div>
                        <div className="info-block">
                            <p>{t("wave")}</p>
                            <div className="briefcase">
                                <NavLink className="home-link" to='/form/registration'>{t("goInClub")}</NavLink>
                                <img src="/icons/arrow-right.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="right-block">
                        <div className="right-block-title">
                            Olive Club
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-bg"></div>
        </div>
    )
}

export default Home;