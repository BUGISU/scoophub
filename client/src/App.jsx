import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "@/auth/ProtectedRoute";

/* 공통 레이아웃 */
import AppLayout from "@/components/AppLayout";

/* 공개 페이지 */
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Reviews from "@/pages/Reviews";
import Support from "@/pages/Support";
import Login from "@/pages/Login";

/* 마이페이지 */
import MyPageLayout from "@/pages/mypage/MyPageLayout";
import MyPageDashboard from "@/pages/mypage/MyPageDashboard"; // ✅ 추가
import MyPageProfile from "@/pages/mypage/MyPageProfile";
import MyPageSettings from "@/pages/mypage/MyPageSettings";

import AdminMyPage from "@/pages/mypage/AdminMyPage";
import CompanyMyPage from "@/pages/mypage/CompanyMyPage";
import UserMyPage from "@/pages/mypage/UserMyPage";

/* 관리자 콘솔 */
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminCompanies from "@/pages/admin/AdminCompanies";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminReviews from "@/pages/admin/AdminReviews";

/* 회사 페이지 */
import Company from "@/pages/Company";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ===== 일반 사이트 ===== */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />

          {/* ===== 마이페이지 (로그인 필요) ===== */}
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage" element={<MyPageLayout />}>
              <Route index element={<MyPageDashboard />} />
              <Route path="profile" element={<MyPageProfile />} />
              <Route path="settings" element={<MyPageSettings />} />

              {/* role별 마이페이지 (필요하면 유지) */}
              <Route path="admin" element={<AdminMyPage />} />
              <Route path="company" element={<CompanyMyPage />} />
              <Route path="user" element={<UserMyPage />} />

              {/* ✅ 반드시 맨 마지막 */}
              <Route path="*" element={<Navigate to="/mypage" replace />} />
            </Route>
          </Route>

          {/* ===== 회사 전용 ===== */}
          <Route element={<ProtectedRoute roles={["company"]} />}>
            <Route path="/company" element={<Company />} />
          </Route>

          {/* ===== 관리자 콘솔 ===== */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="products" replace />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="companies" element={<AdminCompanies />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="*" element={<Navigate to="products" replace />} />
            </Route>
          </Route>

          {/* ===== 없는 경로 ===== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
