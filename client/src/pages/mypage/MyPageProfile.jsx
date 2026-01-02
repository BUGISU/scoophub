import { useState } from "react";
import { useAuth } from "@/auth/useAuth";

export default function MyPageProfile() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email] = useState(user?.email ?? "");

  function onSave(e) {
    e.preventDefault();
    alert("프로필 저장(예정): " + name);
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 className="h4 mb-3">Profile</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={onSave} className="d-grid gap-3">
            <div>
              <label className="form-label">Email</label>
              <input className="form-control" value={email} disabled />
            </div>

            <div>
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>

            <div className="text-secondary small">
              실제 저장은 다음 단계에서 API 연결합니다.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
