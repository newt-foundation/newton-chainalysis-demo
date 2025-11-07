import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  onClick,
  disabled = false,
  href,
  style,
  variant = "primary",
}: ButtonProps) {
  const variantStyles = {
    primary: {
      backgroundColor: "#18171A",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "#EDEDF3",
      color: "#000000",
    },
  };

  const baseStyle: React.CSSProperties = {
    padding: "12px 20px",
    gap: "8px",
    borderRadius: "80px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    textDecoration: "none",
    ...variantStyles[variant],
    ...style,
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            return;
          }
          onClick?.();
        }}
        style={{
          ...baseStyle,
          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyle,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
}
