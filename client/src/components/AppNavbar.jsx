// client/src/components/AppNavbar.jsx
import { I18N } from "@/assets/language/i18n";

const TAB_KEYS = ["home", "products", "reviews", "support"];

export default function AppNavbar({ tab, setTab, lang, setLang }) {
  const t = I18N[lang].navbar;

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <button
          type="button"
          className="navbar-brand btn btn-link p-0 text-decoration-none fw-bold"
          onClick={() => setTab("home")}
        >
          ScoopHub
        </button>

        <button
          className="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {TAB_KEYS.map((key) => (
              <li key={key} className="nav-item">
                <button
                  type="button"
                  className={`nav-link btn btn-link ${
                    tab === key ? "active fw-semibold" : ""
                  }`}
                  onClick={() => setTab(key)}
                >
                  {t.tabs[key]}
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex gap-2 align-items-center">
            <input className="form-control" placeholder={t.search} />
            <button
              className="btn btn-outline-secondary text-nowrap flex-shrink-0"
              type="button"
              style={{ whiteSpace: "nowrap", minWidth: 84 }} // ← 최소 폭 주면 더 안전
            >
              {t.search}
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 align-items-center ms-auto">
        <div className="btn-group" role="group" aria-label="Language">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => setLang(lang === "ko" ? "en" : "ko")}
          >
            {lang === "ko" ? "EN" : "KO"}
          </button>
        </div>
      </div>
    </nav>
  );
}
