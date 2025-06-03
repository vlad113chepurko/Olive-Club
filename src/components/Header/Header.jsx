import './Header.scss';
import { useNavigate} from "react-router-dom";
export default function Header() {
    const navigate = useNavigate();
  return (
    <header className="header">
      <div onClick={() => navigate('/')} className="header-logo">
        <img className="hover:cursor-pointer" src="/logo.svg" alt="logo" width={214} height={40}/>
      </div>
        <div className="language-circle hover:cursor-pointer">
            <p>
                RU
            </p>
        </div>
    </header>
  )
}