interface ToAddressInputProps {
  toAddress: string;
  error: string;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ToAddressInput({ toAddress, error, handleAddressChange }: ToAddressInputProps) {
  return (
    <>
      <div style={{ color: "#77767A", marginBottom: "5px", fontSize: "14px" }}>Send 1 wei to</div>
      <div>
        <input
          type="text"
          value={toAddress}
          onChange={handleAddressChange}
          placeholder="Enter destination address"
          style={{
            width: "100%",
            padding: "12px",
            fontFamily: "monospace",
            fontSize: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            outline: "none",
            boxSizing: "border-box",
            maxWidth: "400px",
          }}
        />
        {error && (
          <div style={{ color: "#ef4444", fontSize: "14px", marginTop: "8px" }}>{error}</div>
        )}
      </div>
    </>
  );
}
