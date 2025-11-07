import React from "react";

interface CodeProps {
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
}

export function CodeSnippet({ children, label, style }: CodeProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 600,
  };

  const codeStyle: React.CSSProperties = {
    backgroundColor: "#F8F8FA",
    color: "#77767A",
    border: "1px solid #DDDBE0",
    borderRadius: "12px",
    padding: "12px 16px",
    fontFamily: "monospace",
    fontSize: "12px",
    maxHeight: "150px",
    overflow: "auto",
    margin: 0,
    display: "flex",
    gap: "16px",
    ...style,
  };

  const lineNumberStyle: React.CSSProperties = {
    color: "#A8A7AB",
    textAlign: "right",
    userSelect: "none",
    lineHeight: "1.6",
  };

  const codeContentStyle: React.CSSProperties = {
    flex: 1,
    lineHeight: "1.6",
  };

  // Split content into lines and add line numbers
  const codeContent = typeof children === "string" ? children : String(children);
  const lines = codeContent.split("\n");

  const codeWithLineNumbers = (
    <pre style={codeStyle}>
      <div style={lineNumberStyle}>
        {lines.map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      <div style={codeContentStyle}>{codeContent}</div>
    </pre>
  );

  if (label) {
    return (
      <div style={containerStyle}>
        <div style={labelStyle}>{label}</div>
        {codeWithLineNumbers}
      </div>
    );
  }

  return codeWithLineNumbers;
}
