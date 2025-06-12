import paths from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./store/UserStore.jsx";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const user = useUserStore(state => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/" element={<paths.Home />} />
        <Route
          path="/success"
          element={user.email ? <paths.Success /> : <Navigate to="/form/login" replace />}
        />
        <Route
          path="/survey"
          element={user.email ? <paths.Survey /> : <Navigate to="/form/login" replace />}
        />
        <Route
          path="/admin"
          element={user.role === 'admin' ? <paths.Admin /> : <Navigate to="/form/login" replace />}
        />
        <Route
          path="/adminSurvey"
          element={user.role === 'admin' ? <paths.AdminSurvey /> : <Navigate to="/form/login" replace />}
        />
        <Route path="/form" element={<paths.Form />}>
          <Route path="login" element={<paths.Login />} />
          <Route path="registration" element={<paths.Register />} />
          <Route path="verify" element={<paths.Verify />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
