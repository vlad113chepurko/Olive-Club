import "./styles/_Form.scss";
import "./styles/_FormHeader.scss";
import FormHeader from './components/FormHeader';
import { Outlet } from "react-router-dom";;


export default function Form() {
    return (
        <div className="form-wrapper">
            <FormHeader />
            <div className="form-bg"></div>
            <div className="form-container">
                <Outlet />
            </div>
        </div>
    )
}