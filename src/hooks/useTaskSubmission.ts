import { useState } from "react";

export interface TaskSubmissionState {
  toAddress: string;
  setToAddress: (address: string) => void;
  addressInvalidError: string;
  setAddressInvalidError: (error: string) => void;
  isSubmittingTask: boolean;
  setIsSubmittingTask: (isSubmitting: boolean) => void;
  isEvaluatingTask: boolean;
  setIsEvaluatingTask: (isEvaluating: boolean) => void;
  errorSubmittingTask: string | null;
  setErrorSubmittingTask: (error: string | null) => void;
  taskId: string;
  setTaskId: (id: string) => void;
  evaluationResult: boolean | null;
  setEvaluationResult: (result: boolean | null) => void;
  attestation: Record<string, unknown> | null;
  setAttestation: (attestation: Record<string, unknown> | null) => void;
  submitTaskDisabled: boolean;
  setSubmitTaskDisabled: (disabled: boolean) => void;
  resetTask: () => void;
}

export function useTaskSubmission(): TaskSubmissionState {
  const [toAddress, setToAddress] = useState("");
  const [addressInvalidError, setAddressInvalidError] = useState("");
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [isEvaluatingTask, setIsEvaluatingTask] = useState(false);
  const [errorSubmittingTask, setErrorSubmittingTask] = useState<string | null>(null);
  const [taskId, setTaskId] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<boolean | null>(null);
  const [attestation, setAttestation] = useState<Record<string, unknown> | null>(null);
  const [submitTaskDisabled, setSubmitTaskDisabled] = useState(false);

  const resetTask = () => {
    setToAddress("");
    setAddressInvalidError("");
    setIsSubmittingTask(false);
    setIsEvaluatingTask(false);
    setErrorSubmittingTask(null);
    setTaskId("");
    setEvaluationResult(null);
    setAttestation(null);
    setSubmitTaskDisabled(false);
  };

  return {
    toAddress,
    setToAddress,
    addressInvalidError,
    setAddressInvalidError,
    isSubmittingTask,
    setIsSubmittingTask,
    isEvaluatingTask,
    setIsEvaluatingTask,
    errorSubmittingTask,
    setErrorSubmittingTask,
    taskId,
    setTaskId,
    evaluationResult,
    setEvaluationResult,
    attestation,
    setAttestation,
    submitTaskDisabled,
    setSubmitTaskDisabled,
    resetTask,
  };
}
