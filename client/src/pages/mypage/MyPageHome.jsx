import { useAuth } from "@/auth/useAuth";

export default function MyPageHome() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="h4 mb-3">Dashboard</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          Welcome, <b>{user?.email}</b>
        </div>
      </div>
    </div>
  );
}
