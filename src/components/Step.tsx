import React from "react";

interface StepProps {
  number: number;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export function Step({ number, isDisabled = false, children }: StepProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: "12px",
    backgroundColor: "#F8F8FA",
    padding: "16px",
    borderRadius: "12px",
    pointerEvents: isDisabled ? "none" : "auto",
    opacity: isDisabled ? 0.6 : 1,
  };

  const circleStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 600,
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle}>{number}</div>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}
