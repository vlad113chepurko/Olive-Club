import Register from "./pages/Form/Register.jsx";
import Login from "./pages/Form/Login.jsx";
import Admin from "./admin/Admin.jsx";
import Verify from "./pages/Form/Verify.jsx";
import Home from "./pages/Home/Home.jsx";
import Survey from "./pages/Survey/Survey.jsx";
import Success from "./pages/Success/Success.jsx";
import Form from "./pages/Form/Form.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import useUserStore from "./store/UserStore.jsx";

function App() {

    const user = useUserStore(state => state.user);

  return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success" element={user.email ? <Success /> : <Navigate to="/form/login" replace />} />
                <Route path="/survey" element={user.email ? <Survey /> :  <Navigate to="/form/login" replace />} />
                <Route path="/admin" element={
                    user.role === 'admin' ? <Admin /> : <Navigate to="/form/login" replace />
                } />

                <Route path="/form" element={<Form />}>
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<Register />} />
                    <Route path="verify" element={<Verify />} />
                </Route>
            </Routes>
        </div>
  )
}

export default App