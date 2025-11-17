import { POLICY_CLIENT_ADDRESS } from "../constants/Addresses";
import { POLICY_CLIENT_ABI } from "../constants/ABI";
import { ensureSepoliaNetwork } from "../utils/ensureNetwork";
import { TransactionSubmissionState } from "../hooks/useTransactionSubmission";
import { Step } from "./Step";
import { Button } from "./Button";
import { LoadingSpinner } from "./LoadingSpinner";
import { ExternalLink } from "./ExternalLink";
import { StepHeading, Description } from "./Typography";
import { newtonPublicClient } from "../viem/newtonPublicClient";
import { EXPLORER_URLS } from "../constants/explorerUrls";
import { browserWalletClient } from "../viem/browserWalletClient";
import { safeStringify } from "../utils/safeJsonStringify";

interface Step3Props {
  connectedAddress: string | null;
  attestation: Record<string, unknown> | null;
  transactionSubmission: TransactionSubmissionState;
}

export function Step3({ connectedAddress, attestation, transactionSubmission }: Step3Props) {
  const { txHash, setTxHash, txSent, setTxSent, txConfirmed, setTxConfirmed, txError, setTxError } =
    transactionSubmission;

  const submitTransaction = async () => {
    if (!connectedAddress || !attestation || !window.ethereum) return;

    try {
      // Ensure user is on Sepolia network
      const isOnSepolia = await ensureSepoliaNetwork();
      if (!isOnSepolia) {
        setTxError("Please switch to Sepolia network to submit the transaction");
        return;
      }

      setTxSent(true);
      setTxError(null);
      setTxHash(null);

      console.log("Submitting transaction...");

      // Submit the transaction
      const hash = await browserWalletClient.writeContract({
        address: POLICY_CLIENT_ADDRESS as `0x${string}`,
        abi: POLICY_CLIENT_ABI,
        functionName: "sanctionProtectedTransfer",
        args: [attestation],
        account: connectedAddress as `0x${string}`,
        gas: BigInt(120_000),
        value: BigInt(1),
      });

      console.log("Transaction submitted:", hash);
      setTxHash(hash);

      // Wait for transaction confirmation
      const receipt = await newtonPublicClient.waitForTransactionReceipt({ hash });
      console.log("receipt:", JSON.parse(safeStringify(receipt)));
      setTxConfirmed(true);
    } catch (err: unknown) {
      console.error("Error submitting transaction:", err);
      setTxError((err as Error).message || "Failed to submit transaction");
      setTxSent(false);
    }
  };
  return (
    <Step number={3} isDisabled={!connectedAddress || !attestation}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <StepHeading>Send the transaction</StepHeading>
          <div style={{ marginTop: "10px" }} />
          <Description>
            Finally, the proof from the previous step can be used in the policy client to perform a
            transaction. If the evaluation result was "compliant", it will send 1 wei to the
            destination address. If the evaluation result was "non-compliant", the transaction will
            be rejected.
          </Description>
          <Button
            onClick={submitTransaction}
            disabled={!connectedAddress || !attestation || txSent || txConfirmed}
          >
            {txConfirmed
              ? "Transaction Confirmed"
              : txSent
                ? "Submitting Transaction..."
                : "Submit Transaction"}
            {txSent && !txConfirmed && <LoadingSpinner size={16} color="#ffffff" />}
          </Button>
        </div>
        {txConfirmed && (
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
            <img src="/success.svg" alt="Success" style={{ width: "14px", height: "14px" }} />
            Success
          </p>
        )}
      </div>

      {txHash && (
        <p
          style={{
            margin: "20px 0",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <strong>View on Etherscan:</strong>
          <ExternalLink href={`${EXPLORER_URLS.SEPOLIA}/tx/${txHash}`}>
            {`${txHash.slice(0, 10)}...${txHash.slice(-8)}`}
          </ExternalLink>
        </p>
      )}

      {txError && (
        <p style={{ color: "#ef4444", margin: "20px 0", fontSize: "14px" }}>
          Error sending transaction: {txError}
        </p>
      )}
    </Step>
  );
}
