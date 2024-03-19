import ForgotPass from "./components/forgot-password/ForgotPass";
import Login from "./components/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ResetPassword from "./components/reset-password/ResetPassword";
import LoggedIn from "./components/logged-in/LoggedIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logged-in" element={<LoggedIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
