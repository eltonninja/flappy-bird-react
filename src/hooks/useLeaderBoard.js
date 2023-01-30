import axios from "axios";
import { useQuery } from "react-query";

export function useLeaderBoard(page, wallet) {
  const { data, isLoading, isError, error } = useQuery(
    ["leaderboard", page, wallet],
    () =>
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/leaderboard?page=${page}&wallet=${wallet}`
        )
        .then((res) => res.data),
    {
      refetchInterval: 5000,
    }
  );

  return { data, isLoading, isError, error };
}
