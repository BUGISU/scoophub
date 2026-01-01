import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-secondary">Loading...</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
