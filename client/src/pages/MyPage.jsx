import { useAuth } from "@/auth/useAuth";
import AdminMyPage from "@/pages/mypage/AdminMyPage";
import CompanyMyPage from "@/pages/mypage/CompanyMyPage";
import UserMyPage from "@/pages/mypage/UserMyPage";

export default function MyPage() {
  const { user, loading } = useAuth();

  if (loading) return null; // 또는 로딩 UI
  if (!user) return null; // ProtectedRoute가 막지만 안전장치

  if (user.role === "admin") return <AdminMyPage />;
  if (user.role === "company") return <CompanyMyPage />;
  return <UserMyPage />;
}
