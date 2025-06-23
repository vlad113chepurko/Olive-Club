import useSurvey from "../../../hooks/useSurvey";
import {useEffect} from "react";
import {useSurveyCount} from "../../../store/SurveyCount";
import {useTranslation} from "react-i18next";

function SurveyConfig({questions, answers, setAnswers}) {
  const {count, setCountIncrement, setCountDecrement} = useSurveyCount();
  const {t} = useTranslation();
  const isFinished = count >= questions.length - 1;

  const {handleSubmitSurvey} = useSurvey();

  useEffect(() => {
    console.log("Count:", count);
    console.log("Answers:", answers);
  }, [count, answers]);

  const handleNext = () => {
    if (count < questions.length - 1) {
      setCountIncrement();
    } else {
      setCountIncrement();
    }
  };

  const handlePrev = () => {
    if (count > 0) {
      setCountDecrement();
    }
  };

  const handleSkip = () => {
    if (!answers[count]) {
      setAnswers((prev) => ({
        ...prev,
        [count]: "Skip",
      }));
    }
    handleNext();
  };


  return (
      <div className="survey-config">
        <button
          type="button"
          onClick={handlePrev}
          className="prev-skip-button"
          disabled={count === 0}
        >
          {t("surveyPrev")}
        </button>

        { isFinished ? (
          <>
            <button
              type="button"
              onClick={() => handleSubmitSurvey(answers)}
              className="next-end-button"
            >
              {t("surveyEnd")}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              disabled={true}
              className="prev-skip-button"
            >
              {t("surveySkip")}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleNext}
              className="next-end-button"
            >
              {t("surveyNext")}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="prev-skip-button"
            >
              {t("surveySkip")}
            </button>
          </>
        )}
      </div>
  );
}

export default SurveyConfig;
