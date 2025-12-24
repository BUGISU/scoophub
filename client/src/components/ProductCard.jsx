const formatKRW = (n) => new Intl.NumberFormat("ko-KR").format(n) + "원";

export default function ProductCard({ product, onClick }) {
  const cal = product.nutrition?.calories ?? "-";
  const protein = product.nutrition?.proteinG ?? "-";

  return (
    <div
      className="card h-100"
      role="button"
      onClick={() => onClick?.(product.id)}
    >
      <div className="card-body">
        <div className="text-secondary small">{product.brand}</div>
        <h3 className="h6 mb-2">{product.name}</h3>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge text-bg-primary">{product.flavor}</span>
          <span className="text-secondary small">{cal} kcal</span>
          <span className="text-secondary small">
            {formatKRW(product.price)}
          </span>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>단백질</span>
            <strong>{protein}g</strong>
          </li>
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>칼로리</span>
            <strong>{cal}kcal</strong>
          </li>
          <li className="list-group-item px-0 d-flex justify-content-between">
            <span>평점</span>
            <strong>{product.rating}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
