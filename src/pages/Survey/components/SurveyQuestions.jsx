import { useTranslation } from "react-i18next";

export default function SurveyQuestions({ answers, setAnswers, questions, count }) {

  const { t } = useTranslation();

  const currentQuestion = questions[count];

  const handleChange = (questionIndex, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: option
    }));
  };

  return (
    <div>
      <article className="survey-article">
        <h1>{currentQuestion.question}</h1>
        <p>{t("surveyParticipationHint")}</p>
      </article>

      <div className="question-block">
        {currentQuestion.options.map((option, index) => (
          <label key={index} className="radio-container">
            <input
              type="radio"
              name={`question-${count}`}
              value={option}
              checked={answers[count] === option}
              onChange={() => handleChange(count, option)}
            />
            <span className="custom-radio"></span>
            <p>{option}</p>
          </label>
        ))}
      </div>
    </div>
  );
}
