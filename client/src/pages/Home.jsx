import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products as MOCK } from "../data/products";

export default function Home() {
  const [q, setQ] = useState("");
  const [flavor, setFlavor] = useState("ALL");
  const [sort, setSort] = useState("RATING_DESC");

  const flavors = useMemo(
    () => ["ALL", ...new Set(MOCK.map((p) => p.flavor))],
    []
  );

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
    if (sort === "RATING_DESC")
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sort === "PRICE_ASC")
      sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    return sorted;
  }, [q, flavor, sort]);

  return (
    <div className="container py-4">
      <h1 className="h3 mb-1">ScoopHub</h1>
      <div className="text-secondary mb-3">단백질 쉐이크 탐색 & 리뷰</div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <label className="form-label">검색</label>
              <input
                className="form-control"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="브랜드 또는 제품명"
              />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label">맛</label>
              <select
                className="form-select"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
              >
                {flavors.map((f) => (
                  <option key={f} value={f}>
                    {f === "ALL" ? "전체" : f}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label">정렬</label>
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="RATING_DESC">평점 높은 순</option>
                <option value="PRICE_ASC">가격 낮은 순</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-between align-items-center">
            <div className="text-secondary">결과: {filtered.length}개</div>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                setQ("");
                setFlavor("ALL");
                setSort("RATING_DESC");
              }}
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {filtered.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <ProductCard
              product={p}
              onClick={(id) => alert(`상세보기: ${id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
