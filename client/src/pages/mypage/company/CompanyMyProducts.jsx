import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "@/lib/api";

function badgeClass(status) {
  if (status === "APPROVED") return "badge bg-success";
  if (status === "PENDING") return "badge bg-warning text-dark";
  if (status === "REJECTED") return "badge bg-danger";
  return "badge bg-secondary";
}

export default function CompanyMyProducts() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    try {
      setErr("");
      setLoading(true);

      // ✅ 백엔드: GET /api/company/products
      const data = await apiGet("/company/products");
      setItems(data.products ?? []);
    } catch (e) {
      setErr(e.message || "내 제품 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
        <div>
          <h1 className="h4 mb-1">My Products</h1>
          <div className="text-secondary small">
            제품 등록 요청 시 상태는 <b>PENDING</b>이며, 관리자 승인 후{" "}
            <b>APPROVED</b>가 됩니다.
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={load}
          >
            새로고침
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/mypage/my-products/new")}
          >
            제품 등록
          </button>
        </div>
      </div>

      {err && (
        <div className="alert alert-danger py-2" role="alert">
          {err}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-secondary">로딩 중...</div>
          ) : items.length === 0 ? (
            <div className="text-secondary">
              아직 등록한 제품이 없습니다. “제품 등록”을 눌러 요청해 보세요.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr className="text-secondary">
                    <th style={{ width: 80 }}>ID</th>
                    <th>제품</th>
                    <th style={{ width: 140 }}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <div className="fw-semibold">{p.name}</div>
                        <div className="text-secondary small">
                          {p.brand || "-"} / {p.flavor || "-"} / {p.price ?? 0}
                          원
                        </div>
                      </td>
                      <td>
                        <span className={badgeClass(p.status)}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
