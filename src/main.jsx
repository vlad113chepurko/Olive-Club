import { BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './styles.css';
import './i18n.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
