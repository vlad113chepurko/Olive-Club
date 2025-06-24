import "./styles/_Survey.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation} from "react-i18next";
import { useSurveyCount } from "../../store/SurveyCount.jsx";
import { useState, useEffect } from "react";
import SurveyConfig from "./components/SurveyConfig";
import SurveyHeader from "./components/SurveyHeader";
import SurveyQuestion from "./components/SurveyQuestions";

function Survey() {
  const { count, resetCount } = useSurveyCount();
  const [answers, setAnswers] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  const questions = t("surveyQuestions", { returnObjects: true });

  useEffect(() => {
    resetCount();
    console.log("count", count);
    console.log("questions", questions);
  }, []);

  const isFinished = count >= questions.length;

  return (
    <div className="survey-wrapper">
      <div className="survey-bg"></div>
      <div className="survey">
        <form className="survey-block">

          <SurveyHeader isFinished={isFinished} count={count} questions={questions} />

          { !isFinished ? (
            <SurveyQuestion
              answers={answers}
              setAnswers={setAnswers}
              count={count}
              questions={questions}
            />

          ) : (
            navigate("/success")
          )}

          <SurveyConfig answers={answers} setAnswers={setAnswers} questions={questions}  />
        </form>
      </div>
    </div>
  );
}

export default Survey;
