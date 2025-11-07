import { Button } from "./Button";

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        padding: "16px 20px",
        borderBottom: "1px solid #d1d5db",
        marginBottom: "20px",
      }}
    >
      <img
        src="/newton-logo.svg"
        alt="Newton Logo"
        style={{
          height: "36px",
        }}
      />
      <Button href="https://docs.newt.foundation" variant="secondary">
        View Docs
        <img
          src="/external-link.svg"
          alt="View on Newton Docs"
          style={{ width: "14px", height: "14px" }}
        />
      </Button>
    </header>
  );
}
