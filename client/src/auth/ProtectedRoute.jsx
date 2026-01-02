import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 1) 인증 복구 중이면 대기 (원하면 로딩 UI로 변경)
  if (loading) return null;

  // 2) 미로그인: /login으로 보내면서 "원래 가려던 위치"를 state.from에 담는다
  if (!user) {
    // 이미 어딘가에서 from을 들고 온 경우(예: Navbar에서 /login 이동)라면 그걸 보존
    const existingFrom = location.state?.from;

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: existingFrom ?? location,
        }}
      />
    );
  }

  // 3) roles 제한이 있을 때, 권한 없으면 홈(또는 마이페이지)로
  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 4) 통과
  return <Outlet />;
}
