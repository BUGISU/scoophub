export default function Footer() {
  return (
    <footer className="border-top bg-white">
      <div className="container py-3 d-flex justify-content-between text-secondary small">
        <div>© {new Date().getFullYear()} ScoopHub</div>
        <div>Protein shake explorer & reviews</div>
      </div>
    </footer>
  );
}
