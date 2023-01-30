import axios from "axios";
import { useQuery } from "react-query";

export function useLastGame(walletAddress) {
  const { data, isLoading, isError, error } = useQuery(
    ["last-game", walletAddress],
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/last-game/${walletAddress}`)
        .then((res) => res.data)
  );

  return { data, isLoading, isError, error };
}
