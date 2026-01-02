import { useNavigate } from "react-router-dom";

export default function AdminMyPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">관리자 마이페이지</h1>

      <div className="d-grid gap-2" style={{ maxWidth: 420 }}>
        <button className="btn btn-primary" onClick={() => navigate("/admin")}>
          관리자 콘솔로 이동
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/products")}
        >
          제품 관리
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/users")}
        >
          회원 관리
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/reviews")}
        >
          리뷰 관리
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin/companies")}
        >
          회사 관리
        </button>
      </div>
    </div>
  );
}
