import axios from "axios";
import { useQuery } from "react-query";

export function useLeaderBoard(page, wallet, sortByScore) {
  const { data, isLoading, isError, error } = useQuery(
    ["leaderboard", page, wallet, sortByScore],
    () =>
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/leaderboard?page=${page}&wallet=${wallet}&sortByScore=${sortByScore}`
        )
        .then((res) => res.data),
    {
      refetchInterval: 5000,
    }
  );

  return { data, isLoading, isError, error };
}
