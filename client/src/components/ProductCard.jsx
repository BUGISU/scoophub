import { I18N } from "@/assets/language/i18n";

export default function ProductCard({ product, lang = "ko", onClick }) {
  const t = I18N[lang].card;

  const cal = product.nutrition?.calories ?? "-";
  const protein = product.nutrition?.proteinG ?? "-";

  const priceText =
    typeof product.price === "number"
      ? new Intl.NumberFormat(lang === "ko" ? "ko-KR" : "en-US").format(
          product.price
        ) + t.won
      : "-";
  return (
    <div
      className="card h-100"
      role="button"
      style={{ cursor: "pointer" }}
      onClick={() => onClick?.(product.id)}
    >
      <div className="card-body">
        <div className="text-secondary small">{product.brand}</div>
        <h3 className="h6 mb-2 line-2">{product.name}</h3>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge text-bg-primary">{product.flavor}</span>
          <span className="text-secondary small">{cal} kcal</span>
          <span className="text-muted">{priceText}</span>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>{t.protein}</span>
            <strong>{protein}g</strong>
          </li>
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>{t.calories}</span>
            <strong>{cal}kcal</strong>
          </li>
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>{t.rating}</span>
            <strong>{product.rating ?? "-"}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
