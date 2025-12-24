export default function LangTabs({ lang, setLang }) {
  return (
    <div className="btn-group" role="group" aria-label="Language">
      <button
        type="button"
        className={`btn btn-sm ${
          lang === "ko" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setLang("ko")}
      >
        한국어
      </button>
      <button
        type="button"
        className={`btn btn-sm ${
          lang === "en" ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setLang("en")}
      >
        English
      </button>
    </div>
  );
}
