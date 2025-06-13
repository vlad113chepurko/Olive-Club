import { useEffect } from "react";

function useMatchPhone(form, countries, selected, setSelected) {
  useEffect(() => {
    if (!form.phone) return;
    const matched = countries.find(c => form.phone.startsWith(c.prefix));
    if (matched && matched.code !== selected.code) {
      setSelected(matched);
    }
  }, [form.phone, countries, selected.code, setSelected]);
}

export default useMatchPhone;