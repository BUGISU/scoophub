import { useState } from "react";

export default function MyPageSettings() {
  const [marketing, setMarketing] = useState(false);
  const [emailNoti, setEmailNoti] = useState(true);

  function onSave(e) {
    e.preventDefault();
    alert(`설정 저장(예정)\nmarketing=${marketing}\nemailNoti=${emailNoti}`);
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 className="h4 mb-3">Settings</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={onSave} className="d-grid gap-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="emailNoti"
                checked={emailNoti}
                onChange={(e) => setEmailNoti(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="emailNoti">
                Email notifications
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="marketing"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="marketing">
                Marketing messages
              </label>
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
