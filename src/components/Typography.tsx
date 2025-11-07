interface TypographyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function StepHeading({ children, style }: TypographyProps) {
  return (
    <h4
      style={{
        margin: "5px 0",
        fontSize: "18px",
        fontWeight: "500",
        ...style,
      }}
    >
      {children}
    </h4>
  );
}

export function Description({ children, style }: TypographyProps) {
  return (
    <p
      style={{
        color: "#77767A",
        margin: "20px 0",
        fontSize: "14px",
        ...style,
      }}
    >
      {children}
    </p>
  );
}
