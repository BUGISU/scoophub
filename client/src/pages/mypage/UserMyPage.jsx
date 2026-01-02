import { useAuth } from "@/auth/useAuth";

export default function UserMyPage() {
  const { user } = useAuth();

  return (
    <div className="container py-4" style={{ maxWidth: 960 }}>
      <h1 className="h4 mb-1">마이페이지</h1>
      <div className="text-secondary small mb-3">
        {user?.email} ({user?.role})
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="fw-semibold mb-2">내 활동</div>
              <ul className="mb-0">
                <li>내 리뷰</li>
                <li>찜/즐겨찾기</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="fw-semibold mb-2">계정</div>
              <ul className="mb-0">
                <li>프로필 수정</li>
                <li>비밀번호 변경</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
