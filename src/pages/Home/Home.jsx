import './Home.scss';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header.jsx";

function Home() {
    return (
        <div className="home">
            <Header />
                <div className="left-block">
                    <section className="info-block">
                        <h2>Family</h2>
                        <div className="p-container">
                            <p>«Ваш путь к прибыльному оливковому бизнесу и элитной недвижимости в Грузии»</p>
                        </div>
                        <div className="briefcase">
                            <Link className="home-link" to="/registration">Вступить в клуб</Link>
                            <img width={30} src="/icons/arrow-right.svg" alt="arrow-right" />
                        </div>
                    </section>
                </div>
                <div className="right-block">
                    <h2>Olive Club</h2>
                </div>
        </div>
    )
}

export default Home;