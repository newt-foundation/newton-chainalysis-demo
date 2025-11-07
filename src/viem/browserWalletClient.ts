import { createWalletClient, custom, walletActions } from "viem";
import { sepolia } from "viem/chains";

export const browserWalletClient = createWalletClient({
  chain: sepolia,
  transport: custom((window as any).ethereum),
  // @ts-ignore - viem extend type inference issue
}).extend(walletActions);
