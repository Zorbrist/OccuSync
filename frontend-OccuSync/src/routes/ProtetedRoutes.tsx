import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  allowedBusinessRoles?: string[];
}

const ProtectedRoute = ({
  allowedRoles,
  allowedBusinessRoles,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  let user = null;

  try {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (error) {
    console.error('Corrupted user data found. Forcing logout.');

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  }

  // Not logged in or data was corrupted
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check global role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Check business role if specified
  if (
    allowedBusinessRoles &&
    !allowedBusinessRoles.includes(user.business_role)
  ) {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return <Outlet />;
};

export default ProtectedRoute;