import { useState, useEffect } from "react";

export function useWalletConnection() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (!window.ethereum) return;

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts && accounts.length > 0) {
          setConnectedAddress(accounts[0]);
        }
      } catch (err) {
        console.error("Error checking wallet connection:", err);
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      setConnectedAddress(accounts.length > 0 ? accounts[0] : null);
    };

    if (window.ethereum?.on) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  return { connectedAddress, setConnectedAddress };
}
