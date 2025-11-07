import React, { useState, useRef, useEffect } from "react";

interface CollapsableProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapsable({ header, children, defaultOpen = false }: CollapsableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const headerContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    WebkitUserSelect: "none",
  };

  const chevronStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    transition: "transform 0.3s ease",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    flexShrink: 0,
  };

  const contentWrapperStyle: React.CSSProperties = {
    overflow: "hidden",
    transition: "height 0.3s ease",
    height: height !== undefined ? `${height}px` : "auto",
  };

  const contentInnerStyle: React.CSSProperties = {
    paddingBottom: isOpen ? "12px" : "0",
    transition: "padding 0.3s ease",
  };

  return (
    <div>
      <div style={headerContainerStyle} onClick={handleToggle}>
        <div style={{ flex: 1 }}>{header}</div>
        <img src="/chevron-down.svg" alt={isOpen ? "Collapse" : "Expand"} style={chevronStyle} />
      </div>
      <div style={contentWrapperStyle}>
        <div ref={contentRef} style={contentInnerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
