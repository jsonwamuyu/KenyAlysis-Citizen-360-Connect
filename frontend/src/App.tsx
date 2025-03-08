import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CitizenDashboard from "./pages/CitizenDashboard";
import GovernmentOfficialDashboard from "./pages/GovernmentOfficialDashboard";
import AdminDashboard from "./pages/AdminDashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route path="/user/citizen" element={<CitizenDashboard />} />
          {/* <Route path="/user/citizen/"/> */}
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[2]} />}>
          <Route
            path="/user/gvt-official"
            element={<GovernmentOfficialDashboard />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[3]} />}>
          <Route path="/user/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
