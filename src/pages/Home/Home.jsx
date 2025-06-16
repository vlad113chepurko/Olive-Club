import './styles/_Home.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from "../../components/Header/Header.jsx";

function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
            <div className="home-wrapper">
                <div className="home-bg"></div>
                <div className="home">
                    <Header />
                    <div className="blocks">
                        <div className="block-1">
                            <div className="block-1__title">
                                Family
                            </div>
                            <section className="block-1__description">
                                <p className={'block_para'}>{t("wave")}</p>
                                <div
                                  onClick={() => navigate("/form/registration")}
                                  className="block-1__text">
                                    <p className={'link'}>{t("goInClub")}</p>
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
            </div>
    );
}


export default Home;