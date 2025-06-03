import "./Survey.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/UserStore.jsx";
import { useSurveyCount } from "../../store/SurveyCount.jsx";
import { useState, useEffect } from "react";

const question = [
    {
        question: "Что вам ближе?",
        options: ["Instagram", "Друзья", "Реклама", "Поиск в Google", "Другое"]
    },
    {
        question: "Что тебе важнее всего в клубе?",
        options: ["Доход", "Знания", "Сообщество", "Инвестиции", "Недвижимость"]
    },
    {
        question: "Какой формат встреч тебе ближе?",
        options: ["Онлайн", "Оффлайн", "Микс", "Чат", "Форум"]
    },
    {
        question: "Сколько ты готов инвестировать?",
        options: ["< $1k", "$1k-$5k", "$5k-$10k", "$10k+", "Пока не знаю"]
    },
    {
        question: "Ты был в Грузии?",
        options: ["Да", "Нет", "Планирую", "Не интересуюсь", "Хочу туда"]
    }
];

function Survey() {
    const { count, setCountIncrement, setCountDecrement, setCountOne } = useSurveyCount();
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const { user } = useUserStore();

    useEffect(() => {
        setCountOne();
    }, [])

    const handleChange = (questionIndex, option) => {
        setAnswers({
            ...answers,
            [questionIndex]: option
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const logs = Object.entries(answers).map(([questionId, answer]) => ({
            questionId: Number(questionId),
            answer,
            email: user.email,
        }));

        if (count === 5) {
            try {
                const res = await axios.post(
                    `http://localhost:3000/answers`,
                    logs,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (res.status === 200 || res.status === 201) {
                    console.log("Ответы сохранены успешно");
                    navigate('/success')
                } else {
                    console.error("Что-то пошло не так", res.status);
                }

            } catch (err) {
                console.error("Ошибка при отправке:", err);
            }
        }
    };

    const handleNext = () => {
        if (count < 5) {
            setCountIncrement();
        }
    }

    const handlePrev = () => {
        if (count > 1) {
            setCountDecrement();
        }
    }

    const handleSkip = () => {
        handleNext();
    }

    return (
        <div className="survey-wrapper">
            <div className="survey-bg">
                <div className="survey">
                    <form method="post" onSubmit={handleSubmit} className="survey-block">
                        <div className="survey-header">
                            <img onClick={() => navigate('/')} src="/logo.svg" alt="logo" width={150} height={40} />
                            <p>{count} из 5</p>
                            <img className="hover:cursor-pointer" src="/close.svg" alt="close" width={25} height={25} />
                        </div>
                        {question[count - 1] && (
                            <>
                                <article className="survey-article">
                                    <h1>{question[count - 1].question}</h1>
                                    <p>Выберите подходящий формат участия</p>
                                </article>
                                <div className="question-block">
                                    {question[count - 1].options.map((option, index) => (
                                        <label key={index} className="radio-container">
                                            <input
                                                type="radio"
                                                name={`question-${count}`}
                                                value={option}
                                                checked={answers[count - 1] === option}
                                                onChange={() => handleChange(count - 1, option)}
                                            />
                                            <span className="custom-radio"></span>
                                            <p>{option}</p>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}
                        <div className="survey-config">
                            <button onClick={handlePrev} className="prev-skip-button">Предыдущий</button>
                            {count === 5 ? (
                                <button type="submit" className="next-end-button">Завершить</button>
                            ) : (
                                <button type="button" onClick={handleNext} className="next-end-button">Дальше</button>
                            )}
                            <button onClick={handleSkip} className="prev-skip-button">Пропустить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Survey;