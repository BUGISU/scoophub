import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import ProductDetail from "@/pages/ProductDetail";
import Reviews from "@/pages/Reviews";
import Support from "@/pages/Support";

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Routes>
    </div>
  );
}
