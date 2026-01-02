import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

export default function MyPageDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h4 mb-1">Dashboard</h1>
          <div className="text-secondary small">
            Welcome, {user?.email} ({user?.role})
          </div>
        </div>

        {user?.role === "admin" && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin")}
          >
            Admin Console
          </button>
        )}
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="fw-semibold mb-1">Quick Actions</div>
              <div className="text-secondary small mb-3">
                Jump to frequently used pages.
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigate("/mypage/profile")}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigate("/mypage/settings")}
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="fw-semibold mb-1">Account</div>
              <div className="text-secondary small mb-3">
                Basic account info.
              </div>

              <ul className="mb-0">
                <li>Email: {user?.email}</li>
                <li>Role: {user?.role}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="fw-semibold mb-1">Status</div>
              <div className="text-secondary small mb-3">
                Coming soon: points, activity, etc.
              </div>
              <div className="alert alert-secondary mb-0 py-2">Coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
