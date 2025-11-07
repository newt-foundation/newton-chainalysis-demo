import { Step } from "./Step";
import { Button } from "./Button";
import { StepHeading, Description } from "./Typography";

interface Step1Props {
  connectedAddress: string | null;
  setConnectedAddress: (address: string | null) => void;
}

export function Step1({ connectedAddress, setConnectedAddress }: Step1Props) {
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      if (accounts && accounts.length > 0) {
        setConnectedAddress(accounts[0]);
        console.log("Connected to wallet:", accounts[0]);
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  return (
    <Step number={1}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <StepHeading>Connect your wallet</StepHeading>
          {connectedAddress ? (
            <Description>
              Connected to{" "}
              <span style={{ fontFamily: "monospace", color: "#000000" }}>{connectedAddress}</span>.
              The transaction in Step 3 will be submitted from this address.
            </Description>
          ) : (
            <Description>Connect your wallet to submit tasks and transactions.</Description>
          )}
        </div>
        {connectedAddress ? (
          <p
            style={{
              color: "#00CC8F",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              margin: 0,
            }}
          >
            <img src="/success.svg" alt="Connected" style={{ width: "14px", height: "14px" }} />
            Connected
          </p>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </div>
    </Step>
  );
}
