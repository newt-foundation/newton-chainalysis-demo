export const REGO_CODE = `# Chainalysis Sanctions Policy
# --------------------------------

package chainalysis_sanctions_agent

# By default, deny requests.
default allow := false

# From Intent
to_address := input.to

# From Policy Data
api_call_status := data.data.status
checked_address := data.data.address
is_sanctioned := data.data.sanctioned

# Allow the action if the to address is not sanctioned
allow if {
  api_call_status == 200
  checked_address == to_address
  not is_sanctioned
}`;

export const POLICY_DATA_JS = `import { fetch as httpFetch } from 'newton:provider/http@0.1.0';

export function run(address) {
  const response = httpFetch({
    url: \`https://o66wu5mr47.execute-api.us-east-2.amazonaws.com/default/chainalysis/address/\${address}\`,
    method: "GET",
    headers: [],
    body: null
  });
  
  const body = JSON.parse(new TextDecoder().decode(new Uint8Array(response.body)));
  
  return JSON.stringify({ 
    status: response.status,
    address,
    sanctioned: body.identifications.length > 0,
    identifications: body.identifications,
  });
}`;

export const SMART_CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {NewtonPolicyClient} from "@newton/contracts/src/mixins/NewtonPolicyClient.sol";
import {INewtonPolicy} from "@newton/contracts/src/interfaces/INewtonPolicy.sol";
import {NewtonMessage} from "@newton/contracts/src/core/NewtonMessage.sol";

contract YourVault is NewtonPolicyClient {
    event Success();

    error InvalidAttestation();
    error TransferFailed();
	
    // since the factory is used to clone the client, the constructor doesn't need to do anything
    constructor() {}

    // this is called by the deploy script
    function initialize(
        address policyTaskManager,
        address policy, // refers to the policy template address
        address owner
    ) external {
        _initNewtonPolicyClient(policyTaskManager, policy, owner);
    }
	
    // this function duplicates the functionality the base NewtonPolicyClient without permissioning
    // don't do this in production
    function setPolicy(INewtonPolicy.PolicyConfig memory _config) external {
        _setPolicy(_config);
    }
  
    // this is the policy guarded function
    function sanctionProtectedTransfer(NewtonMessage.Attestation memory attestation) external payable {
        require(_validateAttestation(attestation), InvalidAttestation());

        // Your function's business logic goes here

        // Extract recipient and value from the attestation intent
        address recipient = attestation.intent.to;
        uint256 amount = attestation.intent.value;

        // Transfer ETH to the recipient
        (bool success, ) = recipient.call{value: amount}("");
        require(success, TransferFailed());

        emit Success();
    }
}`;
