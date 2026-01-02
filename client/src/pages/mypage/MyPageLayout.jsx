import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

function buildMenu(role) {
  // 공통
  const base = [
    { to: "", label: "Dashboard", end: true },
    { to: "profile", label: "Profile" },
    { to: "settings", label: "Settings" },
  ];

  if (role === "admin") {
    // 관리자면 콘솔 바로가기 추가
    return [
      ...base,
      { to: "/admin/products", label: "Admin Page", external: true },
      // { to: "/admin/users", label: "Admin: Users", external: true },
      // { to: "/admin/reviews", label: "Admin: Reviews", external: true },
      // { to: "/admin/companies", label: "Admin: Companies", external: true },
    ];
  }

  if (role === "company") {
    return [
      ...base,
      { to: "my-products", label: "My Products" },
      { to: "review-monitor", label: "Review Monitor" },
    ];
  }

  // 일반 user
  return [
    ...base,
    { to: "my-reviews", label: "My Reviews" },
    { to: "favorites", label: "Favorites" },
  ];
}

export default function MyPageLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menu = buildMenu(user?.role);

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* 좌측 사이드바 */}
        <aside className="col-12 col-md-3 col-lg-2 border-end bg-white p-3">
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none fw-bold mb-2"
            onClick={() => navigate("/mypage")}
          >
            My Page
          </button>

          <div className="text-secondary small mb-3">
            {user?.email}
            <br />({user?.role})
          </div>

          <nav className="nav nav-pills flex-column gap-1">
            {menu.map((m) =>
              m.external ? (
                <button
                  key={m.to}
                  type="button"
                  className="nav-link text-start btn btn-link text-dark"
                  onClick={() => navigate(m.to)}
                >
                  {m.label}
                </button>
              ) : (
                <NavLink
                  key={m.to}
                  to={m.to}
                  end={m.end}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-semibold" : "text-dark"}`
                  }
                >
                  {m.label}
                </NavLink>
              )
            )}
          </nav>

          <hr />

          <div className="d-grid gap-2">
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

        {/* 우측 콘텐츠 */}
        <main className="col-12 col-md-9 col-lg-10 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
