import Registration from "./pages/Form/Registration.jsx";
import Login from "./pages/Form/Login.jsx";
import Admin from "./admin/Admin.jsx";
import Verify from "./pages/Form/Verify.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

import useUserStore from "./store/UserStore.jsx";

function App() {

    const user = useUserStore(state => state.user);

  return (
        <div>
          <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Verify />} />
                <Route
                    path="/admin"
                    element={
                        user.role === 'admin' ? <Admin /> : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </div>
  )
}

export default App