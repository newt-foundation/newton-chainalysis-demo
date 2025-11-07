export function SubHeader() {
  return (
    <div style={{ marginTop: "40px", marginBottom: "20px" }}>
      <h1 style={{ fontSize: "30px" }}>Chainalysis Sanctions Policy</h1>
      <p style={{ color: "#77767A" }}>
        This example policy checks the destination address of an intent against Chainalysis'
        Sanctions Screening API to ensure the transaction is not sent to a sanctioned address.
      </p>
      <p style={{ color: "#77767A" }}>
        This demo app walks through task submission, evaluation,and sending the proof to a
        policy-guarded smart contract on-chain.
      </p>
    </div>
  );
}
