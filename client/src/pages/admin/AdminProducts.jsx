import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";

function Badge({ status }) {
  const cls =
    status === "PENDING"
      ? "badge text-bg-warning"
      : status === "APPROVED"
      ? "badge text-bg-success"
      : status === "REJECTED"
      ? "badge text-bg-danger"
      : "badge text-bg-secondary";

  return <span className={cls}>{status}</span>;
}

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await apiGet("/admin/products");
      setItems(data.products ?? data.items ?? []);
    } catch (e) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const pendingCount = useMemo(
    () => items.filter((x) => x.status === "PENDING").length,
    [items]
  );

  async function approve(id) {
    setErr("");
    setBusyId(id);
    try {
      await apiPatch(`/admin/products/${id}/approve`);
      // 낙관적 업데이트(선택) or 다시 불러오기
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p))
      );
    } catch (e) {
      setErr(e.message || "Approve failed");
    } finally {
      setBusyId(null);
    }
  }

  async function reject(id) {
    setErr("");
    setBusyId(id);
    try {
      await apiPatch(`/admin/products/${id}/reject`);
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "REJECTED" } : p))
      );
    } catch (e) {
      setErr(e.message || "Reject failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 1100 }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h4 mb-1">Admin / Products</h1>
          <div className="text-secondary small">
            Pending: <b>{pendingCount}</b>
          </div>
        </div>

        <button className="btn btn-outline-secondary" onClick={load}>
          새로고침
        </button>
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
          ) : items.length === 0 ? (
            <div className="text-secondary">등록된 제품이 없습니다.</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>ID</th>
                    <th>제품</th>
                    <th style={{ width: 160 }}>상태</th>
                    <th style={{ width: 220 }}>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>
                        <div className="fw-semibold">{p.name}</div>
                        <div className="text-secondary small">
                          {p.flavor ?? "-"} / {p.price ?? 0}원
                          {p.companyEmail ? ` · ${p.companyEmail}` : ""}
                        </div>
                      </td>
                      <td>
                        <Badge status={p.status} />
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            disabled={p.status !== "PENDING" || busyId === p.id}
                            onClick={() => approve(p.id)}
                          >
                            승인
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            disabled={p.status !== "PENDING" || busyId === p.id}
                            onClick={() => reject(p.id)}
                          >
                            거절
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => alert(JSON.stringify(p, null, 2))}
                          >
                            상세
                          </button>
                        </div>
                        {p.status !== "PENDING" && (
                          <div className="text-secondary small mt-1">
                            PENDING 상태에서만 승인/거절 가능합니다.
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
