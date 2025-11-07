import { sepolia } from "viem/chains";

export async function ensureSepoliaNetwork(): Promise<boolean> {
  if (!window.ethereum) return false;

  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    const sepoliaChainId = "0xaa36a7"; // 11155111 in hex

    if (chainId === sepoliaChainId) {
      return true;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }],
      });
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: sepoliaChainId,
                chainName: sepolia.name,
                nativeCurrency: {
                  name: sepolia.nativeCurrency.name,
                  symbol: sepolia.nativeCurrency.symbol,
                  decimals: sepolia.nativeCurrency.decimals,
                },
                rpcUrls: [sepolia.rpcUrls.default.http[0]],
                blockExplorerUrls: sepolia.blockExplorers?.default.url
                  ? [sepolia.blockExplorers.default.url]
                  : undefined,
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error("Error adding Sepolia network:", addError);
          return false;
        }
      }
      console.error("Error switching to Sepolia:", switchError);
      return false;
    }
  } catch (err) {
    console.error("Error checking network:", err);
    return false;
  }
}
