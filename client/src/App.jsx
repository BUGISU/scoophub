import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "@/auth/ProtectedRoute";

import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Reviews from "@/pages/Reviews";
import Support from "@/pages/Support";

import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Company from "@/pages/Company";

export default function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />

            {/* 보호 라우트 그룹 */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route element={<ProtectedRoute roles={["company"]} />}>
              <Route path="/company" element={<Company />} />
            </Route>

            {/* 없는 경로 처리: 맨 마지막에 1번만 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
