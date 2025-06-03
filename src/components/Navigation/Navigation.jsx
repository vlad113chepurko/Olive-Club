import './Navigation.scss'
import {Link} from "react-router-dom";

export default function Navigation() {
  return (
    <div
      className="Navigation"
    >
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}