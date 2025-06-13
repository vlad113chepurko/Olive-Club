import { useEffect } from "react";
import useCountries from "../store/CountriesStore";

function useGetFlags() {
  const { setCountries, setSelected } = useCountries();

  useEffect(() => {
    fetch('/flags.json')
      .then(res => res.json())
      .then(data => {
        const countries = data.flags;
        console.debug(countries);
        setCountries(countries);
        setSelected(countries[0]);
      })
      .catch(err => console.error("Ошибка загрузки стран: ", err));
  }, []);
}

export default useGetFlags;
