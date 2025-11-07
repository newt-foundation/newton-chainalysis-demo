import { useState } from "react";
import { Box } from "./Box";
import { Collapsable } from "./Collapsable";
import { CodeSnippet } from "./CodeSnippet";
import { POLICY_TEMPLATE_ADDRESS } from "../constants/Addresses";
import { REGO_CODE, POLICY_DATA_JS } from "../constants/CodeSnippets";
import { EXPLORER_URLS } from "../constants/explorerUrls";

export function Policy() {
  const [policyAddressCopied, setPolicyAddressCopied] = useState(false);

  return (
    <Box style={{ margin: "30px 0" }}>
      <Collapsable
        header={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <h4 style={{ margin: 0 }}>Policy</h4>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "14px",
                  margin: 0,
                  lineHeight: "1",
                }}
              >
                {POLICY_TEMPLATE_ADDRESS}
              </p>
              <img
                src={policyAddressCopied ? "/success.svg" : "/copy.svg"}
                alt="Copy address"
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: "pointer",
                  display: "block",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(POLICY_TEMPLATE_ADDRESS);
                  setPolicyAddressCopied(true);
                  setTimeout(() => setPolicyAddressCopied(false), 1000);
                }}
              />
              <a
                href={`${EXPLORER_URLS.NEWTON}/testnet/policy/${POLICY_TEMPLATE_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src="/external-link.svg"
                  alt="View on Newton Explorer"
                  style={{ width: "14px", height: "14px" }}
                />
              </a>
            </div>
          </div>
        }
      >
        <div style={{ paddingTop: "30px" }}>
          <CodeSnippet label="Rego Code">{REGO_CODE}</CodeSnippet>
          <div style={{ marginTop: "25px" }} />
          <CodeSnippet label="Policy Data Source">{POLICY_DATA_JS}</CodeSnippet>
        </div>
      </Collapsable>
    </Box>
  );
}
