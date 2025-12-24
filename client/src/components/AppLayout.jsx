import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/Footer";

export default function AppLayout() {
  const [lang, setLang] = useState("ko");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 현재 URL 기준으로 active 탭 결정
  const tab = pathname.startsWith("/reviews")
    ? "reviews"
    : pathname.startsWith("/support")
    ? "support"
    : "home"; // products는 지금 홈에서 리스트 보여주니까 home으로 둠(원하면 products 라우트 따로 가능)

  const setTab = (key) => {
    if (key === "home") navigate("/");
    if (key === "products") navigate("/"); // 현재 구조 유지
    if (key === "reviews") navigate("/reviews");
    if (key === "support") navigate("/support");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AppNavbar tab={tab} setTab={setTab} lang={lang} setLang={setLang} />
      <main className="flex-grow-1">
        <Outlet context={{ lang, setLang }} />
      </main>
      <Footer />
    </div>
  );
}
