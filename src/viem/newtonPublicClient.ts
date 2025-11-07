import { createPublicClient, webSocket } from "viem";
import { sepolia } from "viem/chains";
import { newtonPublicClientActions } from "@magicnewton/newton-protocol-sdk";
import { POLICY_CLIENT_ADDRESS } from "../constants/Addresses";
import { ALCHEMY_URL } from "../constants/alchemy";

export const newtonPublicClient = createPublicClient({
  chain: sepolia,
  transport: webSocket(ALCHEMY_URL),
}).extend(
  // @ts-ignore - viem extend type inference issue
  newtonPublicClientActions({
    policyContractAddress: POLICY_CLIENT_ADDRESS,
  })
);
