import "./styles/_Form.scss";
import "./styles/_FormHeader.scss";
import useLoading from '../../hooks/useLoading';
import useLoadingStore from '../../store/LoadingStore';
import FormHeader from './components/FormHeader';
import { Outlet } from "react-router-dom";


export default function Form() {
  const { loading, setLoading } = useLoadingStore();
  useLoading( loading, setLoading );

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }
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