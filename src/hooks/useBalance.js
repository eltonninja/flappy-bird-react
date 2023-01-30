import { useQuery } from "react-query";

export function useBalance(walletAddress, algodclient) {
  const { data, isLoading, isError, error } = useQuery("balance", () => {
    if (!walletAddress) return 0;
    return algodclient
      .accountInformation(walletAddress)
      .do()
      .then((info) => info.amount / 1_000_000);
  });

  return { data, isLoading, isError, error };
}
