import Registration from "./pages/Form/Registration.jsx";
import Login from "./pages/Form/Login.jsx";
import Admin from "./admin/Admin.jsx";
import Verify from "./pages/Form/Verify.jsx";
import Home from "./pages/Home/Home.jsx";
import Survey from "./pages/Survey/Survey.jsx";
import {Routes, Route, Navigate, Form} from "react-router-dom";

import useUserStore from "./store/UserStore.jsx";

function App() {

    const user = useUserStore(state => state.user);

  return (
        <div className="main-wrapper">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/survey" element={
                    user.email ? <Survey /> : <Verify />
                } />
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