import React from "react";

interface EvaluationResultProps {
  result: "true" | "false";
}

export function EvaluationResult({ result }: EvaluationResultProps) {
  const isCompliant = result === "true";

  const baseStyle: React.CSSProperties = {
    padding: "5px 9px",
    borderRadius: "0.5rem",
    fontSize: "10px",
    fontWeight: 600,
    backgroundColor: isCompliant ? "#90f0d3" : "#ffd594",
    color: "#000000",
    width: "fit-content",
    letterSpacing: "0.05em",
  };

  return <div style={baseStyle}>{isCompliant ? "COMPLIANT" : "NON COMPLIANT"}</div>;
}
