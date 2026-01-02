import { useAuth } from "@/auth/useAuth";

export default function CompanyMyPage() {
  const { user } = useAuth();

  return (
    <div className="container py-4" style={{ maxWidth: 960 }}>
      <h1 className="h4 mb-1">회사 마이페이지</h1>
      <div className="text-secondary small mb-3">
        {user?.email} ({user?.role})
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="fw-semibold mb-2">준비할 기능</div>
          <ul className="mb-0">
            <li>내 제품 목록/등록 요청</li>
            <li>내 제품 리뷰 모니터링</li>
            <li>회사 정보 관리</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
