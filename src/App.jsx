import paths from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import useUserStore from "./store/UserStore.jsx";
import useLoadingTimer from './hooks/useLoadingTimer';
import useLoadingStore from './store/LoadingStore';

function App() {
  const user = useUserStore(state => state.user);
  const { loading, loadingTimer, setLoadingTimer } = useLoadingStore();
  useLoadingTimer( loadingTimer, setLoadingTimer );


  if (loading || loadingTimer) {
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
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
          <Route path="recovery" element={<paths.Recovery />} />
        </Route>
        <Route path="/privacy" element={<paths.Privacy />} />
      </Routes>
    </div>
  );
}

export default App;
