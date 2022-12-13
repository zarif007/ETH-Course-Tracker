import { useQuery } from "react-query";

export const connectWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Metamask not detected");
      return;
    }
    let chainId = await ethereum.request({ method: "eth_chainId" });

    let accounts = await ethereum.request({ method: "eth_requestAccounts" });

    return accounts[0];
  } catch (error) {
    console.error(error);
  }
};

export const useGetWalletAddress = () =>
  useQuery(["wallet-address"], connectWallet);
