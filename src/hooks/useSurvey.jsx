import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";
import useLoadingStore from "../store/LoadingStore";

const useSurvey = () => {

  const navigate = useNavigate();
  const {  setLoading } = useLoadingStore()
  const { user }  = useUserStore();

  const handleSubmitSurvey = async (answers) => {
    setLoading(true);

    try {
      const formattedAnswers = Object.entries(answers).map(([questionIndex, answer]) => ({
        user: user.email,
        questionIndex: Number(questionIndex),
        answer,
        createdAt: new Date()
      }));

      // "https://www.familyoliveclub.com/api/answers"
      // `http://localhost:3000/api/answers`

      const res = await axios.post("https://www.familyoliveclub.com/api/answers", formattedAnswers);

      console.log(res.data.message);
      if (res.status === 200) {
        navigate("/success");
      }
    } catch (err) {
      console.error("Error with sending:", err);
    } finally {
      setLoading(false);
    }
  };


  return { handleSubmitSurvey }
}

export default useSurvey;