import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import usePersist from "./hooks/usePersist";

function RequireAuth({
  children,
}: {
  children: JSX.Element;
}): React.ReactElement {
  const [auth] = usePersist("user_auth");
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  const [auth] = usePersist("user_auth");
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, [auth]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;
