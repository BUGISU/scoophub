import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

const MENU = [
  { to: "products", label: "Products" },
  { to: "companies", label: "Companies" },
  { to: "users", label: "Users" },
  { to: "reviews", label: "Reviews" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <aside className="col-12 col-md-3 col-lg-2 border-end bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none fw-bold"
              onClick={() => navigate("/")}
            >
              ScoopHub Admin
            </button>
          </div>

          <div className="text-secondary small mb-3">
            {user?.email} ({user?.role})
          </div>

          <nav className="nav nav-pills flex-column gap-1">
            {MENU.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : "text-dark"}`
                }
                end
              >
                {m.label}
              </NavLink>
            ))}
          </nav>

          <hr />

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/mypage")}
            >
              Back to MyPage
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              Back to site
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="col-12 col-md-9 col-lg-10 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
