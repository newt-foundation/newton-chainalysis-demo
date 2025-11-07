interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {children}
      <img
        src="/external-link.svg"
        alt="View externally"
        style={{ width: "14px", height: "14px" }}
      />
    </a>
  );
}
