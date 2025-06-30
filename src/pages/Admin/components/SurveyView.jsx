import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetUserSurvey from "../../../hooks/useGetUserSurvey";

function SurveyView() {
  const { userEmail  } = useParams();
  const { fetchSurvey } = useGetUserSurvey();
  const decodedEmail = decodeURIComponent(userEmail);
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const loadSurvey = async () => {
      const data = await fetchSurvey(decodedEmail);
      setSurvey(data);
    };
    loadSurvey();
  }, [decodedEmail]);

  if (!survey) return null;


  return (
    <div className="admin-panel">
      <Link to="/admin">Вернуться назад</Link>
      <h2>Опрос пользователя: {survey.userName}</h2>
      <ul>
        {survey.questions.map((q, i) => (
          <li key={q.id}>
            <strong>{i + 1}. {q.text}</strong>
            <p>Ответ: {q.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyView;