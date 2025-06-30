import axios from 'axios';

const useGetUserSurvey = () => {
  const fetchSurvey = async (decodedEmail) => {
    try {

      const response = await axios.post("https://www.familyoliveclub.com/api/admin/getUserSurvey", {
        decodedEmail,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Ошибка при получении опроса", response);
        return null;
      }

    } catch (error) {
      console.error("Ошибка при запросе опроса:", error);
      return null;
    }
  };

  return { fetchSurvey };
};

export default useGetUserSurvey;
