import './styles/_Home.scss';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from "../../components/Header/Header.jsx";

function Home() {
    const { t } = useTranslation();

    return (
            <div className="home">
                <Header />
                <div className="blocks">
                    <div className="block-1">
                        <div className="block-1__title">
                            Family
                        </div>
                        <section className="block-1__description">
                            <p>{t("wave")}</p>
                            <div className="block-1__text">
                                <NavLink to="/form/registration">{t("goInClub")}</NavLink>
                                <img src="/icons/arrow-right.svg" alt="arrow-right" />
                            </div>
                        </section>
                    </div>
                    <div className="block-2">
                        <div className="block-2__title">
                            Olive Club
                        </div>
                    </div>
                </div>
            </div>
    );
}


export default Home;