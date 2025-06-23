import { useNavigate } from "react-router-dom";

export default function SurveyHeader({ isFinished, count, questions }) {
  const navigate = useNavigate();

  return (
    <div className="survey-header">
      <div className="header-item header-left">
        <img
          className="logo"
          onClick={() => navigate("/")}
          src="/assets/logo.svg"
          alt="logo"
        />
      </div>

      <div className="header-item header-center">
        <p className="survey-header-counter">
          {!isFinished ? count + 1 : questions.length} / {questions.length}
        </p>
      </div>

      <div className="header-item header-right">
        <img
          className="close"
          onClick={() => navigate("/")}
          src="/icons/close.svg"
          alt="close"
        />
      </div>
    </div>
  );
}
