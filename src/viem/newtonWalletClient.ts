import { createWalletClient, publicActions, webSocket } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { newtonWalletClientActions } from "@magicnewton/newton-protocol-sdk";
import { sepolia } from "viem/chains";
import { SUBMIT_TASK_PRIVATE_KEY } from "../constants/Addresses";
import { ALCHEMY_URL } from "../constants/alchemy";

const signer = privateKeyToAccount(SUBMIT_TASK_PRIVATE_KEY as `0x${string}`);

export const newtonWalletClient = createWalletClient({
  chain: sepolia,
  transport: webSocket(ALCHEMY_URL),
  account: signer,
})
  // @ts-ignore - viem extend type inference issue
  .extend(publicActions)
  .extend(
    newtonWalletClientActions({
      developerPk: SUBMIT_TASK_PRIVATE_KEY as `0x${string}`,
    })
  );
