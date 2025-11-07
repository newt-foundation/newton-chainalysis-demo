import { Box } from "./Box";
import { CodeSnippet } from "./CodeSnippet";
import { Description } from "./Typography";

interface IntentProps {
  intentCode: string;
}

export function Intent({ intentCode }: IntentProps) {
  return (
    <Box style={{ margin: "30px 0", backgroundColor: "#fff" }}>
      <div>
        <h4 style={{ margin: 0 }}>Intent</h4>
        <Description style={{ margin: "10px 0" }}>
          This is the task that gets submitted to the Newton Protocol. When you enter the "to"
          address, the intent will be updated to reflect that, as well as the "wasmArgs" which
          represents the "to" address in hex bytes that is passed to the policy wasm params. It
          represents sending 1 wei.
        </Description>
        <CodeSnippet>{intentCode}</CodeSnippet>
      </div>
    </Box>
  );
}
