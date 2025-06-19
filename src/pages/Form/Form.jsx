import "./styles/_Form.scss";
import "./styles/_FormHeader.scss";
import FormHeader from './components/FormHeader';
import { Outlet } from "react-router-dom";
import components from "../../components";
import useErrorStore from "../../store/ErrorStore";

export default function Form() {
    const { isError } = useErrorStore();
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