import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  userId: number;
  email: string;
  role_id: number; // Role: 1 = Citizen, 2 = Gov Official, 3 = Admin
  exp: number;
}

interface ProtectedRouteProps {
  allowedRoles: number[]; // Allowed roles for this route
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Check if user has the required role
    if (!allowedRoles.includes(decoded.role_id)) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
