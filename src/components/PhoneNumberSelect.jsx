import useGetFlags from "../hooks/useGetFlags";
import useMatchPhone from "../hooks/useMatchPhone";
import useCountries from "../store/CountriesStore";
import components from "./index";
import "../pages/Form/styles/_Form.scss";



function PhoneNumberSelect({ form, setForm }) {
  const { countries, selected, setSelected } = useCountries();
  useGetFlags();
  useMatchPhone(form, countries, selected, setSelected);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isNumeric = /^[\d+]*$/.test(value);

    if (isNumeric) {
      setForm({ [name]: value });
    }
  };

  const handleChangeCountry = (e) => {
    const selectedCountry = countries.find(c => c.code === e.target.value);
    setSelected(selectedCountry);
  };


  return (
    <div className="phone-number-select">
      <select
        value={selected.code}
        onChange={handleChangeCountry}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.prefix} {country.name}
          </option>
        ))}
      </select>

      <img
        src={"/icons/arrow-bottom-phone.svg"}
        alt="phone number"
        width={15}
        height={10}
      />

      <components.Input
        name="phone"
        holder="Phone number"
        value={form.phone}
        func={handleChange}
        complete="tel"
        required
      />
    </div>
  );
}

export default PhoneNumberSelect;
