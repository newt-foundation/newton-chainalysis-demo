import { useState } from "react";

export interface TransactionSubmissionState {
  txHash: string | null;
  setTxHash: (hash: string | null) => void;
  txSent: boolean;
  setTxSent: (sent: boolean) => void;
  txConfirmed: boolean;
  setTxConfirmed: (confirmed: boolean) => void;
  txError: string | null;
  setTxError: (error: string | null) => void;
  resetTransaction: () => void;
}

export function useTransactionSubmission(): TransactionSubmissionState {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txSent, setTxSent] = useState(false);
  const [txConfirmed, setTxConfirmed] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);

  const resetTransaction = () => {
    setTxHash(null);
    setTxSent(false);
    setTxConfirmed(false);
    setTxError(null);
  };

  return {
    txHash,
    setTxHash,
    txSent,
    setTxSent,
    txConfirmed,
    setTxConfirmed,
    txError,
    setTxError,
    resetTransaction,
  };
}
