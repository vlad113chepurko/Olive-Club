import "./Survey.scss";

function Survey() {
    return (
        <div className="survey">
            <h1>Survey</h1>
            <div className="surver-block">
                <div className="surver-header">
                    <img src="/Group3.png" alt=""/>
                    <p>{} из 5</p>
                </div>
                <article>
                    <h1>{}</h1>
                    <p>Выберите подходящий формат участия</p>
                </article>
                <div className="surver-buttons">

                </div>
                <div className="surver-config">
                    <button className="prev-button">Предыдущий</button>
                    <button className="next-button">Дальше</button>
                    <button className="next-button">Пропустить</button>
                </div>
            </div>
        </div>
    )
}

export default Survey;