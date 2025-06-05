import './Home.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from "../../components/Header/Header.jsx";

function Home() {
    const { t } = useTranslation();
    return (
        <div className="home-wrapper">
            <div className="background"></div>
            <div className="home">
                <Header />
                <div className="left-block">
                    <section className="info-block">
                        <h2>Family</h2>
                        <div className="p-container">
                            <p>{t('wave')}</p>
                        </div>
                        <div className="briefcase">
                            <Link className="home-link" to="/registration">{t('goInClub')}</Link>
                            <img width={30} src="/icons/arrow-right.svg" alt="arrow-right" />
                        </div>
                    </section>
                </div>
                <div className="right-block">
                    <h2>Olive Club</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;