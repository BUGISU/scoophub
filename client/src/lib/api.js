const BASE = import.meta.env.VITE_API_BASE_URL;

function getToken() {
  return localStorage.getItem("accessToken");
}

function buildHeaders(extra = {}, useAuth = true) {
  const token = useAuth ? getToken() : null;
  return {
    ...extra,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiPost(path, body, options = {}) {
  const { useAuth = true } = options;

  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: buildHeaders({ "Content-Type": "application/json" }, useAuth),
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || `API error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

export async function apiGet(path, options = {}) {
  const { useAuth = true } = options;

  const res = await fetch(`${BASE}${path}`, {
    headers: buildHeaders({}, useAuth),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || `API error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}
