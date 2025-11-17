import { isAddress } from "viem";
import { TaskResponseResult } from "@magicnewton/newton-protocol-sdk/dist/types/types/task";
import { newtonWalletClient } from "../viem/newtonWalletClient";
import { newtonPublicClient } from "../viem/newtonPublicClient";
import { TaskSubmissionState } from "../hooks/useTaskSubmission";
import { Step } from "./Step";
import { Button } from "./Button";
import { LoadingSpinner } from "./LoadingSpinner";
import { EvaluationResult } from "./EvaluationResult";
import { ToAddressInput } from "./ToAddressInput";
import { ExternalLink } from "./ExternalLink";
import { Intent } from "./Intent";
import { StepHeading, Description } from "./Typography";
import { EXPLORER_URLS } from "../constants/explorerUrls";
import { safeStringify } from "../utils/safeJsonStringify";

interface Step2Props {
  connectedAddress: string | null;
  intentCode: string;
  taskSubmission: TaskSubmissionState;
}

export function Step2({ intentCode, taskSubmission, connectedAddress }: Step2Props) {
  const {
    toAddress,
    setToAddress,
    addressInvalidError,
    setAddressInvalidError,
    submitTaskDisabled,
    setSubmitTaskDisabled,
    isSubmittingTask,
    setIsSubmittingTask,
    isEvaluatingTask,
    setIsEvaluatingTask,
    evaluationResult,
    setEvaluationResult,
    taskId,
    setTaskId,
    errorSubmittingTask,
    setErrorSubmittingTask,
    attestation,
    setAttestation,
  } = taskSubmission;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setToAddress(newAddress);

    if (newAddress && !isAddress(newAddress)) {
      setAddressInvalidError("Invalid Ethereum address format");
    } else {
      setAddressInvalidError("");
    }
  };

  const submitTask = async () => {
    if (submitTaskDisabled || !isAddress(toAddress)) return;

    try {
      setIsEvaluatingTask(false);
      setErrorSubmittingTask(null);
      setIsSubmittingTask(true);
      setTaskId("");
      setSubmitTaskDisabled(true);

      console.log("submitting task...");

      const pendingTask = await newtonWalletClient.submitEvaluationRequest(JSON.parse(intentCode));

      console.log("submitEvaluationRequest result:", pendingTask);

      setTaskId(pendingTask.result.taskId);
      setIsEvaluatingTask(true);

      console.log("waiting for task to respond...");

      const response: TaskResponseResult = await newtonPublicClient.waitForTaskResponded({
        taskId: pendingTask.result.taskId,
        timeoutMs: 30_000,
      });

      console.log("waitForTaskResponded result:", response);
      console.log("evaluation result:", response.taskResponse?.evaluationResult);
      console.log("attestation: ", JSON.parse(safeStringify(response.attestation)));

      setEvaluationResult(response.taskResponse?.evaluationResult ?? null);
      setAttestation(response.attestation ?? null);
    } catch (err) {
      console.error("Error submitting task: ", err);
      setErrorSubmittingTask((err as Error).message || "Failed to submit task");
    } finally {
      setSubmitTaskDisabled(false);
      setIsSubmittingTask(false);
      setIsEvaluatingTask(false);
    }
  };

  const getButtonLabel = () => {
    if (evaluationResult !== null) return "Task Submitted";
    if (isEvaluatingTask) return "Evaluating Task...";
    if (isSubmittingTask) return "Submitting Task...";
    return "Submit Task";
  };

  return (
    <Step number={2} isDisabled={!connectedAddress}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <StepHeading>Submit a task to check the evaluation result</StepHeading>
          <Description>
            A task is a proposed intent along with the policy that it is meant to be evaluated
            against. Tasks are either compliant or non-compliant, meaning the intent is allowed to
            go through or will be rejected.
          </Description>
          <Description>
            Try sending a transaction to yourself, or to a sanctioned wallet
            such as <span style={{ wordBreak: "break-all", overflowWrap: "break-word" }}>0x1da5821544e25c636c1417ba96ade4cf6d2f9b5a</span>
          </Description>
          <ToAddressInput
            toAddress={toAddress}
            error={addressInvalidError}
            handleAddressChange={handleAddressChange}
          />
          <Intent intentCode={intentCode} />
          <Button
            onClick={submitTask}
            disabled={
              !!addressInvalidError ||
              submitTaskDisabled ||
              !connectedAddress ||
              !toAddress ||
              evaluationResult !== null ||
              !!attestation
            }
            style={{ marginTop: "10px" }}
          >
            {getButtonLabel()}
            {isSubmittingTask && <LoadingSpinner size={16} color="#ffffff" />}
          </Button>
        </div>
        {evaluationResult !== null && (
          <p
            style={{
              color: "#00CC8F",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              margin: 0,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <img
              src="/success.svg"
              alt="Connected"
              style={{ width: "14px", height: "14px", flexShrink: 0 }}
            />
            Submitted
          </p>
        )}
      </div>
      <p
        style={{
          margin: "20px 0",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          opacity: taskId ? 1 : 0.5,
          cursor: taskId ? "pointer" : "not-allowed",
          pointerEvents: taskId ? "auto" : "none",
          width: "fit-content",
        }}
      >
        <ExternalLink href={`${EXPLORER_URLS.NEWTON}/testnet/task/${taskId}`}>
          <strong>View in Newton Explorer</strong>
        </ExternalLink>
      </p>
      <div
        style={{
          margin: "20px 0",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          opacity: evaluationResult !== null ? 1 : 0.5,
        }}
      >
        <strong>Evaluation result:</strong>{" "}
        {evaluationResult !== null ? (
          <EvaluationResult result={evaluationResult ? "true" : "false"} />
        ) : (
          "--"
        )}
      </div>

      {errorSubmittingTask && (
        <p style={{ color: "#ef4444", margin: "20px 0", fontSize: "14px" }}>
          Error submitting or evaluating task: {errorSubmittingTask}
        </p>
      )}
    </Step>
  );
}
