import { useMemo } from "react";
import { Header } from "./components/Header";
import { SubHeader } from "./components/SubHeader";
import { Box } from "./components/Box";
import { Policy } from "./components/Policy";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Spacer } from "./components/Spacer";
import { Description } from "./components/Typography";
import { POLICY_CLIENT_ADDRESS } from "./constants/Addresses";
import { stringToHexBytes } from "./utils/stringToHexBytes";
import { useWalletConnection } from "./hooks/useWalletConnection";
import { useTaskSubmission } from "./hooks/useTaskSubmission";
import { useTransactionSubmission } from "./hooks/useTransactionSubmission";
import { Button } from "./components/Button";
import { PolicyClient } from "./components/PolicyClient";

export default function App() {
  const taskSubmission = useTaskSubmission();
  const transactionSubmission = useTransactionSubmission();
  const { connectedAddress, setConnectedAddress } = useWalletConnection();

  // Intent code
  const intentCode = useMemo(() => {
    const wasmArgs = stringToHexBytes(taskSubmission.toAddress);
    return `{
  "policyClient": "${POLICY_CLIENT_ADDRESS}",
  "intent": {
      "from": "${connectedAddress}",
      "to": "${taskSubmission.toAddress}",
      "value": "0x1",
      "data": "0x",
      "chainId": 11155111,
      "functionSignature": "0x"
  },
  "timeout": 60,
  "wasmArgs": "${wasmArgs}"
}`;
  }, [connectedAddress, taskSubmission.toAddress]);

  const handleStartOver = () => {
    taskSubmission.resetTask();
    transactionSubmission.resetTransaction();
  };

  return (
    <div>
      <Header />
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "10px 40px" }}>
        <SubHeader />
        <Policy />
        <PolicyClient />
        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>Walkthrough - Send a Verified Intent</h3>
              <Description style={{ margin: "10px 0" }}>
                Follow the steps below to submit a task and then send a transaction.
              </Description>
            </div>
            <Button variant="secondary" onClick={handleStartOver}>
              Start Over
            </Button>
          </div>
          <Step1 connectedAddress={connectedAddress} setConnectedAddress={setConnectedAddress} />
          <Spacer />
          <Step2
            connectedAddress={connectedAddress}
            intentCode={intentCode}
            taskSubmission={taskSubmission}
          />
          <Spacer />
          <Step3
            connectedAddress={connectedAddress}
            attestation={taskSubmission.attestation}
            transactionSubmission={transactionSubmission}
          />
        </Box>
      </div>
      <Spacer size={100} />
    </div>
  );
}
