export const POLICY_CLIENT_ABI = [
  {
    type: "function",
    name: "sanctionProtectedTransfer",
    inputs: [
      {
        name: "attestation",
        type: "tuple",
        components: [
          {
            name: "taskId",
            type: "bytes32",
          },
          {
            name: "policyId",
            type: "bytes32",
          },
          {
            name: "policyClient",
            type: "address",
          },
          {
            name: "intent",
            type: "tuple",
            components: [
              {
                name: "from",
                type: "address",
              },
              {
                name: "to",
                type: "address",
              },
              {
                name: "value",
                type: "uint256",
              },
              {
                name: "data",
                type: "bytes",
              },
              {
                name: "chainId",
                type: "uint256",
              },
              {
                name: "functionSignature",
                type: "bytes",
              },
            ],
          },
          {
            name: "expiration",
            type: "uint32",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "Success",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAttestation",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferFailed",
    inputs: [],
  },
];
