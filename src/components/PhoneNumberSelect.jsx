import useGetFlags from "../hooks/useGetFlags";
import useCountries from "../store/CountriesStore";
import components from "./index";
import "../pages/Form/styles/_Form.scss";

function PhoneNumberSelect({ form, handleChange }) {
  const { countries, selected, setSelected } = useCountries();
  useGetFlags();

  const handleChangeCountry = (e) => {
    const selectedCountry = countries.find(c => c.code === e.target.value);
    setSelected(selectedCountry);
    handleChange({
      target: {
        name: "phone",
        value: selectedCountry.prefix
      }
    });
  };

  return (
    <div className="phone-number-select">
      <select
        value={selected.code}
        onChange={handleChangeCountry}
      >
        {countries.map((country) => (
          <option
            key={country.code}
            value={country.code}
          >
            {country.flag} {country.name}
          </option>
        ))}
      </select>

      <img
        src={'/icons/arrow-bottom-phone.svg'}
        alt="phone number"
        width={15}
        height={10}/>

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
