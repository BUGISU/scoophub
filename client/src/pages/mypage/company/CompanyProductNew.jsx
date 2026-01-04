import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "@/lib/api";

export default function CompanyProductNew() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    flavor: "",
    price: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!form.name.trim()) {
      setErr("제품명은 필수입니다.");
      return;
    }

    const priceNumber =
      form.price === "" ? 0 : Number(String(form.price).replaceAll(",", ""));
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setErr("가격을 올바르게 입력해 주세요.");
      return;
    }

    try {
      setSaving(true);
      // ✅ POST /api/company/products
      await apiPost("/company/products", {
        name: form.name.trim(),
        brand: form.brand.trim(),
        flavor: form.flavor.trim(),
        price: priceNumber,
      });

      navigate("/mypage/my-products", { replace: true });
    } catch (e2) {
      setErr(e2.message || "등록에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container py-2" style={{ maxWidth: 720 }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h4 mb-1">제품 등록</h1>
          <div className="text-secondary small">
            등록 후 관리자가 승인하면 공개됩니다.
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
          disabled={saving}
        >
          뒤로
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {err && (
            <div className="alert alert-danger py-2" role="alert">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">제품명 *</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                disabled={saving}
              />
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">브랜드</label>
                <input
                  className="form-control"
                  name="brand"
                  value={form.brand}
                  onChange={onChange}
                  disabled={saving}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">맛</label>
                <input
                  className="form-control"
                  name="flavor"
                  value={form.flavor}
                  onChange={onChange}
                  disabled={saving}
                />
              </div>
            </div>

            <div>
              <label className="form-label">가격</label>
              <input
                className="form-control"
                name="price"
                value={form.price}
                onChange={onChange}
                inputMode="numeric"
                placeholder="예) 59000"
                disabled={saving}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/mypage/my-products")}
                disabled={saving}
              >
                취소
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "등록 중..." : "등록 요청"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
