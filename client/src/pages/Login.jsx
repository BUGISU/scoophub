import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { lang } = useOutletContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    // TODO: 여기서 실제 로그인 API 연결(추후)
    alert(lang === "ko" ? "로그인 시도" : "Login attempt");

    // 임시로 홈으로 이동
    navigate("/");
  }
  async function ping() {
    const res = await fetch("http://localhost:8080/api/health");
    const data = await res.json();
    alert(JSON.stringify(data));
  }

  return (
    <div className="container py-4" style={{ maxWidth: 520 }}>
      <h1 className="h4 mb-3">{lang === "ko" ? "로그인" : "Login"}</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={onSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">
                {lang === "ko" ? "이메일" : "Email"}
              </label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  lang === "ko" ? "example@email.com" : "example@email.com"
                }
                autoComplete="email"
              />
            </div>

            <div>
              <label className="form-label">
                {lang === "ko" ? "비밀번호" : "Password"}
              </label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={lang === "ko" ? "비밀번호 입력" : "Enter password"}
                autoComplete="current-password"
              />
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                {lang === "ko" ? "뒤로" : "Back"}
              </button>

              <button type="submit" className="btn btn-primary">
                {lang === "ko" ? "로그인" : "Login"}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={ping}
              >
                API 테스트
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-secondary small mt-3">
        {lang === "ko"
          ? "다음 단계: 로그인 API 연결 + 토큰 저장 + 보호 라우트 적용"
          : "Next: connect login API + store token + protect routes"}
      </div>
    </div>
  );
}
