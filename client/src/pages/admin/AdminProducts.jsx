import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("PENDING"); // 기본: 승인 대기
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const data = await apiGet("/admin/products"); // ✅ /api/admin/products
      const products = data.products ?? [];
      setItems(products);
    } catch (e) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!status) return items;
    return items.filter((p) => (p.status ?? "PENDING") === status);
  }, [items, status]);

  async function approve(id) {
    if (!confirm("이 제품을 승인할까요?")) return;
    try {
      await apiPatch(`/admin/products/${id}/approve`, {}); // ✅ PATCH
      await load();
    } catch (e) {
      alert("승인 실패: " + (e.message || ""));
    }
  }

  async function reject(id) {
    if (!confirm("이 제품을 거절할까요?")) return;
    try {
      await apiPatch(`/admin/products/${id}/reject`, {});
      await load();
    } catch (e) {
      alert("거절 실패: " + (e.message || ""));
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 1100 }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h4 mb-1">Products</h1>
          <div className="text-secondary small">
            회사 등록 요청(PENDING)을 승인/거절합니다.
          </div>
        </div>

        <div className="d-flex gap-2">
          <select
            className="form-select"
            style={{ width: 180 }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <button className="btn btn-outline-secondary" onClick={load}>
            새로고침
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
            <div className="text-secondary">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-secondary">목록이 비어있습니다.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>ID</th>
                    <th>제품</th>
                    <th style={{ width: 140 }}>회사</th>
                    <th style={{ width: 120 }}>상태</th>
                    <th style={{ width: 240 }}>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <div className="fw-semibold">{p.name}</div>
                        <div className="text-secondary small">
                          {p.flavor ?? "-"} / {p.price ?? "-"}원
                        </div>
                      </td>
                      <td className="text-secondary small">
                        {p.companyEmail ?? p.ownerEmail ?? "-"}
                      </td>
                      <td>
                        <span className="badge text-bg-warning">
                          {p.status ?? "PENDING"}
                        </span>
                      </td>
                      <td>
                        {p.status === "PENDING" ? (
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => approve(p.id)}
                            >
                              승인
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => reject(p.id)}
                            >
                              거절
                            </button>
                          </div>
                        ) : (
                          <div className="text-secondary small">
                            {p.status === "APPROVED"
                              ? `승인일: ${p.approvedAt ?? "-"}`
                              : `거절일: ${p.rejectedAt ?? "-"}`}
                          </div>
                        )}
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
