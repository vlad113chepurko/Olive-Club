import "./styles/_Form.scss";
import "./styles/_FormHeader.scss";
import FormHeader from './components/FormHeader';
import {Outlet, useLocation} from "react-router-dom";
import components from "../../components";
import useErrorStore from "../../store/ErrorStore";
import {useEffect} from "react";

export default function Form() {
    const { isError, clearError } = useErrorStore();
    const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.pathname.startsWith("/form")) {
        clearError();
      }
    };
  }, []);

    return (
        <div className="form-wrapper">
          { isError && <components.Error />}
            <FormHeader />
            <div className="form-bg"></div>
            <div className="form-container">
                <Outlet />
            </div>
        </div>
    )
}