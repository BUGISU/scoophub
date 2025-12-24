import { useOutletContext, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { I18N } from "@/assets/language/i18n";
import ProductCard from "@/components/ProductCard";
import { products as MOCK } from "@/data/products";

export default function Home() {
  const { lang } = useOutletContext();
  const t = I18N[lang];
  const c = t.common;
  const f = t.filter;

  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [flavor, setFlavor] = useState("ALL");
  const [sort, setSort] = useState("RATING_DESC");

  const flavors = useMemo(() => {
    const set = new Set(
      MOCK.map((p) => p.flavor).filter((v) => typeof v === "string" && v.trim())
    );
    return ["ALL", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();

    const list = MOCK.filter((p) => {
      const hitKeyword =
        !keyword ||
        p.brand.toLowerCase().includes(keyword) ||
        p.name.toLowerCase().includes(keyword);

      const hitFlavor = flavor === "ALL" || p.flavor === flavor;

      return hitKeyword && hitFlavor;
    });

    const sorted = [...list];

    if (sort === "RATING_DESC") {
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    if (sort === "PRICE_ASC") {
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }

    return sorted;
  }, [q, flavor, sort]);

  return (
    <div className="container py-4">
      {/* 헤더 */}
      <h1 className="h4 mb-1">ScoopHub</h1>
      <div className="text-secondary mb-3">
        {lang === "ko"
          ? "단백질 쉐이크 탐색 & 리뷰"
          : "Protein shake explorer & reviews"}
      </div>

      {/* 필터 카드 */}
      <div className="card mb-3 shadow-sm" style={{ minHeight: 180 }}>
        <div className="card-body">
          <div className="row g-2">
            {/* 검색 */}
            <div className="col-12 col-md-6">
              <label className="form-label">{c.search}</label>
              <input
                className="form-control"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={c.placeholderSearch}
              />
            </div>

            {/* 맛 필터 */}
            <div className="col-6 col-md-3">
              <label className="form-label">{f.modeTaste}</label>
              <select
                className="form-select"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
              >
                {flavors.map((v) => (
                  <option key={v} value={v}>
                    {v === "ALL" ? c.all : v}
                  </option>
                ))}
              </select>
            </div>

            {/* 정렬 */}
            <div className="col-6 col-md-3">
              <label className="form-label">{c.sort}</label>
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="RATING_DESC">{f.sortRating}</option>
                <option value="PRICE_ASC">{f.sortPrice}</option>
              </select>
            </div>
          </div>

          {/* 결과 / 초기화 */}
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="text-secondary">
              {c.resultCount}: {filtered.length}
            </div>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                setQ("");
                setFlavor("ALL");
                setSort("RATING_DESC");
              }}
            >
              {c.reset}
            </button>
          </div>
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className="row g-3">
        {filtered.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <ProductCard
              product={p}
              lang={lang}
              onClick={(id) => navigate(`/products/${id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
