import PhoneInput from 'react-phone-input-2';
import '../pages/Form/styles/_Form.scss';
import 'react-phone-input-2/lib/style.css';

function PhoneNumberSelect({ form, setForm }) {
  const handleChange = (value) => {
    setForm({ ...form, phone: value });
  };

  return (
      <PhoneInput
        country={'ua'}
        value={form.phone}
        onChange={handleChange}
        inputProps={{
          name: 'phone',
          required: true,
          autoComplete: 'tel',
        }}
        containerClass="phone-number-select"
        inputClass="phone-number-select__input"
        buttonClass="phone-dropdown"
      />
  );
}

export default PhoneNumberSelect;
