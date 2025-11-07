export function Box({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ padding: "20px", border: "1px solid #e5e7eb", borderRadius: "12px", ...style }}>
      {children}
    </div>
  );
}
