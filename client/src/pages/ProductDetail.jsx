import { useMemo, useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { products as MOCK } from "@/data/products";
import { I18N } from "@/assets/language/i18n";

function formatPrice(price, lang) {
  if (typeof price !== "number") return "-";
  const locale = lang === "ko" ? "ko-KR" : "en-US";
  const n = new Intl.NumberFormat(locale).format(price);
  return lang === "ko" ? `${n}원` : `${n} KRW`;
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { lang } = useOutletContext();

  // i18n
  const t = I18N[lang];
  const card = t?.card;

  const product = useMemo(
    () => MOCK.find((p) => String(p.id) === String(id)),
    [id]
  );
  const imgSrc = useMemo(
    () => product?.imageUrl || product?.image || "",
    [product]
  );

  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    setImgOk(true);
  }, [imgSrc]);

  if (!product) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning">
          {lang === "ko" ? "상품을 찾을 수 없습니다." : "Product not found."}
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            {lang === "ko" ? "뒤로가기" : "Back"}
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            {lang === "ko" ? "홈으로" : "Go Home"}
          </button>
        </div>
      </div>
    );
  }

  const n = product.nutrition ?? {};
  const calories = n.calories ?? "-";
  const proteinG = n.proteinG ?? "-";
  const sugarG = n.sugarG ?? "-";
  const fatG = n.fatG ?? "-";
  const carbsG = n.carbsG ?? "-";
  const fiberG = n.fiberG ?? "-";
  const sodiumMg = n.sodiumMg ?? "-";
  const calciumPct = n.calciumPct ?? "-";
  const ironPct = n.ironPct ?? "-";

  const priceText = formatPrice(product.price, lang);

  return (
    <div className="container py-4">
      {/* 상단 헤더 */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="text-secondary small">{product.brand}</div>
          <h1 className="h4 m-0">{product.name}</h1>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm text-nowrap"
            onClick={() => navigate(-1)}
          >
            {lang === "ko" ? "뒤로" : "Back"}
          </button>
          <button
            className="btn btn-outline-secondary btn-sm text-nowrap"
            onClick={() => navigate("/")}
          >
            {lang === "ko" ? "홈" : "Home"}
          </button>
        </div>
      </div>

      {/* 요약 카드 */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2 align-items-center mb-2">
            <span className="badge text-bg-primary">{product.flavor}</span>
            {typeof product.rating !== "undefined" && (
              <span className="badge text-bg-light">
                {card?.rating ?? (lang === "ko" ? "평점" : "Rating")}:{" "}
                {product.rating}
              </span>
            )}
            <span className="badge text-bg-light">
              {card?.calories ?? (lang === "ko" ? "칼로리" : "Calories")}:{" "}
              {calories}
              {card?.kcal ?? "kcal"}
            </span>
          </div>

          <div className="d-flex flex-wrap gap-3">
            <div>
              <div className="text-secondary small">
                {card?.price ?? (lang === "ko" ? "가격" : "Price")}
              </div>
              <div className="fw-semibold">{priceText}</div>
            </div>

            <div>
              <div className="text-secondary small">
                {card?.protein ?? (lang === "ko" ? "단백질" : "Protein")}
              </div>
              <div className="fw-semibold">
                {proteinG}
                {card?.g ?? "g"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 + 설명 */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              {imgSrc && imgOk ? (
                <img
                  src={imgSrc}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ width: "100%", objectFit: "cover" }}
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="text-secondary">
                  {lang === "ko" ? "이미지가 없습니다." : "No image."}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h6 mb-2">
                {lang === "ko" ? "설명" : "Description"}
              </h2>
              <p className="text-secondary mb-0">
                {product.description ||
                  (lang === "ko" ? "설명 없음" : "No description")}
              </p>

              {/* 추후: AI 분석 영역 */}
              <div className="mt-3 p-3 bg-light rounded">
                <div className="fw-semibold mb-1">
                  {lang === "ko"
                    ? "AI 분석(준비중)"
                    : "AI analysis (coming soon)"}
                </div>
                <div className="text-secondary small">
                  {lang === "ko"
                    ? "입력한 목표/BMI/취향에 맞춰 추천 이유를 생성할 예정입니다."
                    : "We will generate personalized reasons based on your BMI, goal, and preferences."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 영양 정보 테이블 */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h6 mb-3">
            {lang === "ko" ? "영양 정보" : "Nutrition facts"}
          </h2>

          <div className="table-responsive">
            <table className="table table-sm align-middle mb-0">
              <tbody>
                <tr>
                  <td className="text-secondary">
                    {card?.calories ?? (lang === "ko" ? "칼로리" : "Calories")}
                  </td>
                  <td className="fw-semibold">
                    {calories}
                    {card?.kcal ?? "kcal"}
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {card?.protein ?? (lang === "ko" ? "단백질" : "Protein")}
                  </td>
                  <td className="fw-semibold">
                    {proteinG}
                    {card?.g ?? "g"}
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "당류" : "Sugar"}
                  </td>
                  <td className="fw-semibold">
                    {sugarG}
                    {card?.g ?? "g"}
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "지방" : "Fat"}
                  </td>
                  <td className="fw-semibold">
                    {fatG}
                    {card?.g ?? "g"}
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "탄수화물" : "Carbs"}
                  </td>
                  <td className="fw-semibold">
                    {carbsG}
                    {card?.g ?? "g"}
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "식이섬유" : "Fiber"}
                  </td>
                  <td className="fw-semibold">
                    {fiberG}
                    {card?.g ?? "g"}
                  </td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "나트륨" : "Sodium"}
                  </td>
                  <td className="fw-semibold">{sodiumMg} mg</td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "칼슘" : "Calcium"}
                  </td>
                  <td className="fw-semibold">{calciumPct} %</td>
                </tr>
                <tr>
                  <td className="text-secondary">
                    {lang === "ko" ? "철분" : "Iron"}
                  </td>
                  <td className="fw-semibold">{ironPct} %</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-secondary small mt-3">
            {lang === "ko"
              ? "표기된 영양정보는 제품/서빙 기준이며, 실제 제품 라벨을 확인하세요."
              : "Nutrition values are per serving/product; please verify the label."}
          </div>
        </div>
      </div>
    </div>
  );
}
