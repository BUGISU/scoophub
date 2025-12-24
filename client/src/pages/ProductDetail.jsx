import { useParams, useOutletContext } from "react-router-dom";
import { I18N } from "@/assets/language/i18n";
import { products as MOCK } from "@/data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { lang } = useOutletContext();
  const t = I18N[lang];

  const product = MOCK.find((p) => String(p.id) === id);

  if (!product) {
    return <div className="container py-4">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="h4 mb-3">{product.name}</h1>
      <p className="text-secondary">{product.brand}</p>

      <ul className="list-group">
        <li className="list-group-item">
          {t.card.protein}: {product.nutrition?.proteinG}g
        </li>
        <li className="list-group-item">
          {t.card.calories}: {product.nutrition?.calories}kcal
        </li>
        <li className="list-group-item">
          {t.card.rating}: {product.rating}
        </li>
      </ul>
    </div>
  );
}
