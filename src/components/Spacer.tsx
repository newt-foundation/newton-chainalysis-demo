interface SpacerProps {
  size?: number;
}

export function Spacer({ size = 20 }: SpacerProps) {
  return <div style={{ marginTop: `${size}px` }} />;
}
