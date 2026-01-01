import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/auth/useAuth";

export default function Login() {
  const { lang } = useOutletContext();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin", { replace: true });
      else if (user.role === "company") navigate("/company", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [user, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const user = await login(email, password);
      //role 별 이동 처리 가능
      if (user.role === "admin") navigate("/admin", { replace: true });
      else if (user.role === "company") navigate("/company", { replace: true });
      else navigate("/", { replace: true });
    } catch (e2) {
      setErr(
        lang === "ko"
          ? "로그인 실패: " + e2.message
          : "Login failed: " + e2.message
      );
    }
  }
  async function ping() {
    try {
      const res = await fetch("http://localhost:8080/api/health");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      alert(JSON.stringify(data));
    } catch (e) {
      alert("API 테스트 실패: " + e.message);
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: 520 }}>
      <h1 className="h4 mb-3">{lang === "ko" ? "로그인" : "Login"}</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          {err && (
            <div className="alert alert-danger py-2" role="alert">
              {err}
            </div>
          )}
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
                name="email"
                required
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
                name="password"
                required
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
                type="button"
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
